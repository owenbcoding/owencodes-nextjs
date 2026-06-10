import { promises as dns } from "node:dns";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_SUBMIT_MS = 3_000;
const MAX_SUBMIT_MS = 2 * 60 * 60 * 1000;

const MAX_SUCCESS_PER_HOUR = 3;
const MAX_ATTEMPTS_PER_WINDOW = 8;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

const BLOCK_DURATIONS_MS = [
  15 * 60 * 1000,
  60 * 60 * 1000,
  24 * 60 * 60 * 1000,
] as const;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "tempmail.com",
  "temp-mail.org",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "10minutemail.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "tempail.com",
  "emailondeck.com",
  "mintemail.com",
  "mytemp.email",
  "mailnesia.com",
  "spamgourmet.com",
  "mailcatch.com",
  "inboxkitten.com",
  "tmpmail.net",
  "tmpmail.org",
  "discard.email",
  "harakirimail.com",
  "mailnull.com",
  "spambox.us",
  "mail-temp.com",
  "moakt.com",
  "burnermail.io",
]);

type IpRecord = {
  successfulAt: number[];
  attemptsAt: number[];
  violationsAt: number[];
  blockedUntil: number;
};

type RateLimitStore = Map<string, IpRecord>;

declare global {
  var __contactRateLimitStore: RateLimitStore | undefined;
}

function getStore(): RateLimitStore {
  if (!globalThis.__contactRateLimitStore) {
    globalThis.__contactRateLimitStore = new Map();
  }
  return globalThis.__contactRateLimitStore;
}

function pruneTimestamps(timestamps: number[], windowMs: number, now: number): number[] {
  const cutoff = now - windowMs;
  return timestamps.filter((timestamp) => timestamp > cutoff);
}

function getOrCreateRecord(store: RateLimitStore, ip: string, now: number): IpRecord {
  const existing = store.get(ip);
  if (!existing) {
    const record: IpRecord = {
      successfulAt: [],
      attemptsAt: [],
      violationsAt: [],
      blockedUntil: 0,
    };
    store.set(ip, record);
    return record;
  }

  existing.successfulAt = pruneTimestamps(existing.successfulAt, 60 * 60 * 1000, now);
  existing.attemptsAt = pruneTimestamps(existing.attemptsAt, ATTEMPT_WINDOW_MS, now);
  existing.violationsAt = pruneTimestamps(existing.violationsAt, 24 * 60 * 60 * 1000, now);

  if (existing.blockedUntil <= now) {
    existing.blockedUntil = 0;
  }

  return existing;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

export type ContactProtectionInput = {
  ip: string;
  name: string;
  email: string;
  message: string;
  companyWebsite?: string;
  formLoadedAt?: number;
};

export type ContactProtectionResult =
  | { allowed: true }
  | {
      allowed: false;
      kind: "blocked" | "rate_limited" | "invalid_email" | "spam";
      retryAfterSeconds: number;
      message: string;
      silent?: boolean;
    };

function blockDurationForViolations(violationCount: number): number {
  if (violationCount <= 0) return 0;
  const index = Math.min(violationCount - 1, BLOCK_DURATIONS_MS.length - 1);
  return BLOCK_DURATIONS_MS[index] ?? BLOCK_DURATIONS_MS.at(-1)!;
}

function recordViolation(record: IpRecord, now: number): number {
  record.violationsAt.push(now);
  const violationCount = record.violationsAt.length;
  const blockMs = blockDurationForViolations(violationCount);
  record.blockedUntil = Math.max(record.blockedUntil, now + blockMs);
  return blockMs;
}

function blockedResult(retryAfterSeconds: number, message: string): ContactProtectionResult {
  return {
    allowed: false,
    kind: "blocked",
    retryAfterSeconds,
    message,
  };
}

function countUrls(text: string): number {
  const matches = text.match(/https?:\/\/|www\./gi);
  return matches?.length ?? 0;
}

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return true;
  return DISPOSABLE_DOMAINS.has(domain);
}

export async function emailDomainAcceptsMail(domain: string): Promise<boolean> {
  try {
    const mxRecords = await dns.resolveMx(domain);
    if (mxRecords.length === 0) return false;
    if (mxRecords.length === 1 && mxRecords[0]?.exchange === ".") return false;
    return true;
  } catch {
    return false;
  }
}

export function checkContactProtection(
  input: ContactProtectionInput,
  now = Date.now(),
): ContactProtectionResult {
  const store = getStore();
  const record = getOrCreateRecord(store, input.ip, now);

  if (record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return blockedResult(
      retryAfterSeconds,
      "Too many attempts. Please wait before trying again.",
    );
  }

  record.attemptsAt.push(now);

  if (record.attemptsAt.length > MAX_ATTEMPTS_PER_WINDOW) {
    const blockMs = 15 * 60 * 1000;
    record.blockedUntil = now + blockMs;
    return blockedResult(
      Math.ceil(blockMs / 1000),
      "Too many attempts. Please wait 15 minutes before trying again.",
    );
  }

  if (input.companyWebsite?.trim()) {
    recordViolation(record, now);
    return {
      allowed: false,
      kind: "spam",
      retryAfterSeconds: 0,
      message: "",
      silent: true,
    };
  }

  if (typeof input.formLoadedAt !== "number" || !Number.isFinite(input.formLoadedAt)) {
    recordViolation(record, now);
    return {
      allowed: false,
      kind: "spam",
      retryAfterSeconds: 0,
      message: "",
      silent: true,
    };
  }

  const elapsed = now - input.formLoadedAt;
  if (elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS) {
    recordViolation(record, now);
    return {
      allowed: false,
      kind: "spam",
      retryAfterSeconds: 0,
      message: "",
      silent: true,
    };
  }

  if (!isValidEmailFormat(input.email)) {
    return {
      allowed: false,
      kind: "invalid_email",
      retryAfterSeconds: 0,
      message: "Please enter a valid email address.",
    };
  }

  if (isDisposableEmail(input.email)) {
    recordViolation(record, now);
    return {
      allowed: false,
      kind: "invalid_email",
      retryAfterSeconds: 0,
      message: "Please use a real email address you can receive replies on.",
    };
  }

  if (countUrls(input.message) > 5) {
    recordViolation(record, now);
    return {
      allowed: false,
      kind: "spam",
      retryAfterSeconds: 0,
      message: "Your message looks like spam. Please remove extra links and try again.",
    };
  }

  if (record.successfulAt.length >= MAX_SUCCESS_PER_HOUR) {
    const oldest = record.successfulAt[0] ?? now;
    const retryAfterSeconds = Math.max(
      60,
      Math.ceil((oldest + 60 * 60 * 1000 - now) / 1000),
    );
    return {
      allowed: false,
      kind: "rate_limited",
      retryAfterSeconds,
      message: "You can send up to 3 messages per hour. Please try again later.",
    };
  }

  return { allowed: true };
}

export function recordSuccessfulContact(ip: string, now = Date.now()): void {
  const store = getStore();
  const record = getOrCreateRecord(store, ip, now);
  record.successfulAt.push(now);
}

export async function validateContactEmail(
  email: string,
): Promise<Extract<ContactProtectionResult, { allowed: false }> | null> {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return {
      allowed: false,
      kind: "invalid_email",
      retryAfterSeconds: 0,
      message: "Please enter a valid email address.",
    };
  }

  const acceptsMail = await emailDomainAcceptsMail(domain);
  if (!acceptsMail) {
    return {
      allowed: false,
      kind: "invalid_email",
      retryAfterSeconds: 0,
      message: "That email domain does not look like it can receive mail. Please check it and try again.",
    };
  }

  return null;
}
