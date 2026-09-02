import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getWriteClient } from "@/sanity/lib/write-client";
import { projectId } from "@/sanity/env";

const CONTACT_NOTIFICATION_RECIPIENTS = ["hermesalba@gmail.com"];

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Verifies the reCAPTCHA v3 token server-side. Skipped gracefully until
// RECAPTCHA_SECRET_KEY is configured, so the form keeps working during setup.
async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true;
  if (!token) return false;

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const result = (await response.json()) as { success: boolean; score?: number };
    return (
      result.success &&
      (result.score === undefined || result.score >= RECAPTCHA_SCORE_THRESHOLD)
    );
  } catch (error) {
    console.error("[contact] recaptcha verification request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !email || !emailPattern.test(email) || !message || message.length < 10) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const recaptchaToken =
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : undefined;

  if (!(await verifyRecaptcha(recaptchaToken))) {
    return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
  }

  console.info("[contact] new submission", { name, email, company });

  // Send a notification email to the sales inboxes. Skipped gracefully until
  // RESEND_API_KEY is configured, so the form keeps working during setup.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      // The Resend SDK resolves with { data, error } instead of throwing on
      // API-level failures (invalid key, unverified sending domain, etc.) —
      // it only throws on network-level errors. Both cases must be checked
      // and logged, or a failed send looks identical to a skipped one.
      const { data, error } = await resend.emails.send({
        from: "Kempro Website <notificaciones@kemprocol.com>",
        to: CONTACT_NOTIFICATION_RECIPIENTS,
        subject: `Nuevo contacto de ${name}`,
        replyTo: email,
        text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || "N/A"}\n\n${message}`,
      });
      if (error) {
        console.error("[contact] resend rejected the email", error);
      } else {
        console.info("[contact] notification email sent", { id: data?.id });
      }
    } catch (error) {
      console.error("[contact] failed to send notification email", error);
    }
  } else {
    console.warn("[contact] RESEND_API_KEY not set — skipping notification email");
  }

  // Store the submission in Sanity so it shows up in the Studio. Skipped
  // gracefully until a Sanity project + write token are configured (see
  // README.md), so the form keeps working during initial setup.
  if (projectId && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await getWriteClient().create({
        _type: "contactSubmission",
        nombre: name,
        correo: email,
        empresa: company || undefined,
        mensaje: message,
        fecha: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[contact] failed to save submission to Sanity", error);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
