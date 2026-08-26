"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/ui/fade-in";

type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterCard() {
  const t = useTranslations("Blog");
  const tFooter = useTranslations("Footer");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!emailPattern.test(email)) {
      setError(t("newsletterErrorInvalid"));
      return;
    }

    setError(undefined);
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <FadeIn className="relative mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <h2 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
            {t("newsletterCompactTitle")}
          </h2>
          <p className="mt-4 text-[16px] text-neutral-300">{t("newsletterCompactDescription")}</p>
        </div>

        <div className="w-full flex-shrink-0 rounded-xl bg-white p-8 shadow-lg lg:w-[420px]">
          {status === "success" ? (
            <div className="flex items-center gap-2 text-[15px] text-primary-600">
              <CheckIcon className="h-5 w-5 flex-shrink-0" />
              {t("newsletterSuccess")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletterPlaceholder")}
                  className="w-full border-b border-neutral-300 bg-transparent pb-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none"
                />
                {error ? <p className="mt-2 text-[13px] text-error-500">{error}</p> : null}
              </div>

              <p className="text-[13px] leading-relaxed text-neutral-500">
                {t("newsletterConsent")}{" "}
                <Link
                  href="/aviso-de-privacidad"
                  className="font-medium text-neutral-700 underline hover:text-primary-600"
                >
                  {tFooter("privacy")}
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-fit items-center gap-2 rounded-md bg-neutral-900 px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {t("newsletterSubmit")}
              </button>

              {status === "error" ? (
                <p className="text-[13px] text-error-500">{t("newsletterError")}</p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
