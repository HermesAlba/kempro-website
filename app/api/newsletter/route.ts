import { NextResponse } from "next/server";
import { Resend } from "resend";
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

  // Resend Contacts — this is what actually makes the subscriber reachable:
  // any contact added here shows up in the Resend dashboard's Audience and
  // can be sent a Broadcast (Resend's built-in newsletter-sending feature).
  // Uses its own RESEND_NEWSLETTER_API_KEY rather than the contact form's
  // RESEND_API_KEY: that key was deliberately scoped to "Sending access"
  // only (least privilege), and the Contacts API requires "Full access" —
  // Resend has no narrower "contacts only" scope. Skipped gracefully until
  // configured, same "degrade, don't break" pattern as the rest of this
  // route.
  if (process.env.RESEND_NEWSLETTER_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_NEWSLETTER_API_KEY);
      const { data, error } = await resend.contacts.create({
        email,
        unsubscribed: false,
      });
      if (error) {
        console.error("[newsletter] resend rejected the contact", error);
      } else {
        console.info("[newsletter] contact added to Resend audience", { id: data?.id });
      }
    } catch (error) {
      console.error("[newsletter] failed to add contact to Resend", error);
    }
  } else {
    console.warn("[newsletter] RESEND_NEWSLETTER_API_KEY not set — skipping Resend contact");
  }

  // Also store the subscriber as a Sanity document, so the raw signup
  // (including locale, for future segmentation) shows up in the Studio too
  // — an internal record independent of whichever sending provider is in
  // use. Skipped gracefully until configured, same pattern as above.
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
