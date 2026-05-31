/**
 * Contact Form Worker — Cloudflare Workers + Email Routing
 * Deploy: `npx wrangler deploy --env production`
 */

import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
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

    const htmlBody = `
      <p><strong>Nombre:</strong> ${escape(name)}</p>
      <p><strong>Email:</strong> ${escape(email)}</p>
      <p><strong>Asunto:</strong> ${escape(subject || "Sin asunto")}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escape(message).replace(/\n/g, "<br>")}</p>
    `;

    const raw = [
      "MIME-Version: 1.0",
      "From: Portfolio Contact <contacto@camuss0.dev>",
      "To: camussovalentin10@gmail.com",
      "Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent(`[Portfolio] ${subject || "Nuevo mensaje"} de ${name}`))) + "?=",
      "Content-Type: text/html; charset=utf-8",
      "",
      `<html><body>${htmlBody}</body></html>`,
    ].join("\r\n");

    try {
      await env.SEND_EMAIL.send(
        new EmailMessage("contacto@camuss0.dev", "camussovalentin10@gmail.com", raw)
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
