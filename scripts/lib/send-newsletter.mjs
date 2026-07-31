export async function sendNewsletter(payload) {
  const endpoint = process.env.NEWSLETTER_SEND_ENDPOINT;
  const token = process.env.NEWSLETTER_SEND_TOKEN;

  if (!endpoint || !token) {
    throw new Error("Missing NEWSLETTER_SEND_ENDPOINT or NEWSLETTER_SEND_TOKEN secret.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      ...payload,
    }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Newsletter send failed (${response.status}): ${responseText}`);
  }

  console.log("Newsletter sent:", responseText);
}
