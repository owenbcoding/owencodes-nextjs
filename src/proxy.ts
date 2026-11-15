import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

function matchesCredential(provided: string, expected: string) {
  const providedBytes = new TextEncoder().encode(provided);
  const expectedBytes = new TextEncoder().encode(expected);

  return (
    providedBytes.length === expectedBytes.length &&
    timingSafeEqual(providedBytes, expectedBytes)
  );
}

function isAuthorized(authorization: string | null, username: string, password: string) {
  const token = authorization?.match(/^Basic\s+(\S+)$/i)?.[1];
  if (!token) return false;

  let credentials: string;
  try {
    const bytes = Uint8Array.from(atob(token), (character) =>
      character.charCodeAt(0),
    );
    credentials = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return false;
  }

  const separator = credentials.indexOf(":");
  if (separator < 1) return false;

  const usernameMatches = matchesCredential(
    credentials.slice(0, separator),
    username,
  );
  const passwordMatches = matchesCredential(
    credentials.slice(separator + 1),
    password,
  );

  return usernameMatches && passwordMatches;
}

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Owen Codes Studio", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Studio access is disabled.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!isAuthorized(request.headers.get("authorization"), username, password)) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
