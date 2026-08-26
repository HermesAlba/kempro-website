"use client";

import { useState, type FormEvent } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckIcon, SendIcon } from "@/components/ui/icons";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

type Status = "idle" | "submitting" | "success" | "error";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

interface Grecaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

async function getRecaptchaToken(): Promise<string | undefined> {
  if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return undefined;

  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(RECAPTCHA_SITE_KEY!, { action: "contact" })
        .then(resolve)
        .catch(() => resolve(undefined));
    });
  });
}

export function ContactForm({
  dark = false,
  showCompany = true,
  submitVariant = "solid",
}: {
  dark?: boolean;
  /** Hides the optional "company" field for a shorter, simplified form. */
  showCompany?: boolean;
  /** "outline" is used when this form is the secondary path on a page
   * (e.g. next to a more prominent schedule-a-call CTA). "text" drops the
   * button chrome entirely — icon+label only, matching CalBookingButton's
   * own "text" variant format and size. "dark" reuses the header's own
   * "Contáctanos" button style verbatim (see CalBookingButton's own
   * "dark" variant for the matching CTA on the same page). */
  submitVariant?: "solid" | "outline" | "text" | "dark";
}) {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(formData: FormData): FormErrors {
    const nextErrors: FormErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) nextErrors.name = t("errors.nameRequired");
    if (!email) {
      nextErrors.email = t("errors.emailRequired");
    } else if (!emailPattern.test(email)) {
      nextErrors.email = t("errors.emailInvalid");
    }
    if (!message) {
      nextErrors.message = t("errors.messageRequired");
    } else if (message.length < 10) {
      nextErrors.message = t("errors.messageMin");
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses = dark
    ? "mt-1.5 block w-full rounded-lg border border-white/40 bg-white/[0.18] px-3.5 py-2 text-[13px] text-white placeholder:text-neutral-700 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
    : "mt-1.5 block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
  const labelClasses = dark
    ? "text-[13px] font-semibold text-white/90"
    : "text-[13px] font-semibold text-neutral-700";
  const requiredMarkClasses = dark ? "text-red-300" : "text-primary-600";

  if (status === "success") {
    // Uses the conventional light-green "success toast" treatment
    // (pale green fill, green border/icon, dark text) unconditionally —
    // not the dark-panel-aware styling the rest of this component uses —
    // since a solid, universally-recognized success color reads better
    // here than anything tinted to match the surrounding bg-[#4A90D9]
    // panel on /contacto (see that page's AccentSide-style column).
    return (
      <div
        role="status"
        className="rounded-2xl border border-success-500/30 bg-[#ECFDF5] p-8 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <CheckIcon className="h-5 w-5 flex-shrink-0 text-success-500" />
          <h3 className="text-lg font-semibold text-neutral-900">{t("successTitle")}</h3>
        </div>
        <p className="mt-2 text-sm text-neutral-600">{t("successDescription")}</p>
        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}

      <div className={showCompany ? "grid gap-4 sm:grid-cols-2" : undefined}>
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t("name")} <span className={requiredMarkClasses}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-sm text-error-500">
              {errors.name}
            </p>
          ) : null}
        </div>

        {showCompany ? (
          <div>
            <label htmlFor="company" className={labelClasses}>
              {t("company")}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={t("companyPlaceholder")}
              className={inputClasses}
            />
          </div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          {t("email")} <span className={requiredMarkClasses}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-error-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t("message")} <span className={requiredMarkClasses}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={t("messagePlaceholder")}
          className={`${inputClasses} h-[64px] resize-none`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-error-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className={`rounded-lg border border-error-500/30 p-4 text-sm text-error-500 ${dark ? "bg-error-500/10" : "bg-error-500/5"}`}
        >
          <p className="font-semibold">{t("errorTitle")}</p>
          <p className="mt-1">{t("errorDescription")}</p>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`inline-flex items-center transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
            submitVariant === "text"
              ? "gap-2 text-[16px] text-primary-600 hover:text-primary-700 hover:underline"
              : submitVariant === "dark"
                ? `${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`
                : `w-full justify-center rounded-lg px-6 py-2.5 text-[13px] ${
                    submitVariant === "outline"
                      ? "border border-primary-600 text-primary-600 hover:bg-primary-50"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`
          }`}
        >
          {submitVariant === "text" ? <SendIcon className="h-[18px] w-[18px] flex-shrink-0" /> : null}
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
        <p
          className={`mt-2 text-[11px] ${submitVariant === "text" || submitVariant === "dark" ? "text-left" : "text-center"} ${dark ? "text-white/75" : "text-neutral-500"}`}
        >
          {t.rich("disclaimer", {
            link: (chunks) => (
              <Link
                href="/aviso-de-privacidad"
                className={`underline ${dark ? "text-white hover:text-white/80" : "hover:text-primary-600"}`}
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </form>
  );
}
