/**
 * Contact Form — Pages Function
 * Sends email via Cloudflare Email Routing (SEND_EMAIL binding)
 */

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const { name, email, subject, message } = body;

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
    from: { name: "Portfolio Contact", email: "contacto@camuss0.dev" },
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
}

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
