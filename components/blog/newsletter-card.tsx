"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterCard() {
  const t = useTranslations("Blog");
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
    <div className="flex h-[280px] w-[330px] flex-shrink-0 flex-col justify-center gap-3 bg-[#F9F7F4] px-6">
      <h3 className="text-[18px] font-bold leading-snug text-neutral-900">
        {t("newsletterCompactTitle")}
      </h3>
      <p className="text-[12px] text-neutral-600">{t("newsletterCompactDescription")}</p>

      {status === "success" ? (
        <div className="mt-1 flex items-center gap-2 text-[12px] text-primary-600">
          <CheckIcon className="h-4 w-4 flex-shrink-0" />
          {t("newsletterSuccess")}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder={t("newsletterPlaceholder")}
              aria-label={t("newsletterPlaceholder")}
              className="h-10 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-label={t("newsletterSubmit")}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
            </button>
          </div>
          {error ? <p className="text-[11px] text-error-500">{error}</p> : null}
          {status === "error" ? (
            <p className="text-[11px] text-error-500">{t("newsletterError")}</p>
          ) : null}
        </form>
      )}
    </div>
  );
}
