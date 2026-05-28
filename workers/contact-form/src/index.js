/**
 * Contact Form Worker — Cloudflare Workers + Email Routing
 *
 * 1. Deploy with `wrangler deploy`
 * 2. Set up Email Routing: create contacto@tudominio.com → forward to your inbox
 * 3. Add send_email binding in wrangler.toml (see below)
 * 4. Update the workerUrl in ContactSection.astro to point to this Worker
 */

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

    await env.SEND_EMAIL.send({
      from: { name: "Portfolio Contact", email: "contacto@tudominio.com" },
      to: [{ email: "camussovalentin10@gmail.com" }],
      subject: `[Portfolio] ${subject || "Nuevo mensaje"} de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Asunto:</strong> ${escape(subject || "Sin asunto")}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escape(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  },
};

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
