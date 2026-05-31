/**
 * Contact Form Worker — Cloudflare Workers + Email Routing
 * Deploy: `npx wrangler deploy --env production`
 */

import { EmailMessage } from "cloudflare:email";

const rateMap = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW = 15 * 60 * 1000;

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (entry && now < entry.resetTime && entry.count >= RATE_LIMIT) {
      return new Response(
        JSON.stringify({ error: "Too many requests" }),
        { status: 429, headers: { "content-type": "application/json", "retry-after": Math.ceil((entry.resetTime - now) / 1000).toString() } }
      );
    }

    if (!entry || now >= entry.resetTime) {
      rateMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    } else {
      entry.count += 1;
    }

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!env.SEND_EMAIL) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const plainBody = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Asunto: ${subject || "Sin asunto"}`,
      "",
      message,
    ].join("\r\n");

    const htmlBody = [
      `<p style="margin:0 0 0.5em"><strong>Nombre:</strong> ${escape(name)}</p>`,
      `<p style="margin:0 0 0.5em"><strong>Email:</strong> ${escape(email)}</p>`,
      `<p style="margin:0 0 0.5em"><strong>Asunto:</strong> ${escape(subject || "Sin asunto")}</p>`,
      `<hr style="border:none;border-top:1px solid #e5e5e5;margin:1em 0">`,
      `<p style="margin:0;white-space:pre-wrap">${escape(message)}</p>`,
    ].join("\r\n");

    var boundary = "===============" + Date.now() + "==";

    var body = [
      "MIME-Version: 1.0",
      "From: Portfolio Contact <contacto@camuss0.dev>",
      "To: camussovalentin10@gmail.com",
      "Reply-To: " + email,
      "Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent(`[Portfolio] ${subject || "Nuevo mensaje"} de ${name}`))) + "?=",
      "Content-Type: multipart/alternative; boundary=\"" + boundary + "\"",
      "",
      "--" + boundary,
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      plainBody,
      "--" + boundary,
      "Content-Type: text/html; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      "<html><body style=\"font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#222;padding:16px\">" + htmlBody + "</body></html>",
      "--" + boundary + "--",
    ].join("\r\n");

    try {
      ctx.waitUntil(
        env.SEND_EMAIL.send(
          new EmailMessage("contacto@camuss0.dev", "camussovalentin10@gmail.com", body)
        )
      );

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e.message }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  },
};

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
