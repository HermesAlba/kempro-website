import { NextResponse } from "next/server";
import { getWriteClient } from "@/sanity/lib/write-client";
import { projectId } from "@/sanity/env";

type NewsletterPayload = {
  email?: unknown;
  locale?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const locale = typeof payload.locale === "string" ? payload.locale : undefined;

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Pending #37: final newsletter provider still to be decided. For now,
  // store the subscriber as a Sanity document — same "skip gracefully until
  // configured" pattern as the contact form (see app/api/contact/route.ts).
  if (projectId && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await getWriteClient().create({
        _type: "newsletterSubscriber",
        correo: email,
        idioma: locale,
        fecha: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[newsletter] failed to save subscriber to Sanity", error);
    }
  } else {
    console.info("[newsletter] Sanity not configured, skipping save", { email });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
