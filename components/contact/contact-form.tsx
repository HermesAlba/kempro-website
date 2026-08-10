"use client";

import { useState, type FormEvent } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckIcon } from "@/components/ui/icons";

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

export function ContactForm() {
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

  const inputClasses =
    "mt-1.5 block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3.5 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
  const labelClasses = "text-[13px] font-semibold text-neutral-700";

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success-500/30 bg-success-500/5 p-8 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <CheckIcon className="h-5 w-5 flex-shrink-0 text-success-500" />
          <h3 className="text-lg font-semibold text-neutral-900">
            {t("successTitle")}
          </h3>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          {t("successDescription")}
        </p>
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
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t("name")} <span className="text-primary-600">*</span>
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
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          {t("email")} <span className="text-primary-600">*</span>
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
          {t("message")} <span className="text-primary-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${inputClasses} h-[120px] resize-none`}
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
          className="rounded-lg border border-error-500/30 bg-error-500/5 p-4 text-sm text-error-500"
        >
          <p className="font-semibold">{t("errorTitle")}</p>
          <p className="mt-1">{t("errorDescription")}</p>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-4 text-[13px] text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
        <p className="mt-3 text-center text-[11px] text-neutral-500">
          {t.rich("disclaimer", {
            link: (chunks) => (
              <Link href="/aviso-de-privacidad" className="underline hover:text-primary-600">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </form>
  );
}
