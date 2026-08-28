"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getCookieConsent, type CookieConsent } from "@/lib/cookie-consent";
import { CloseIcon } from "@/components/ui/icons";

export function CookieSettingsModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (consent: CookieConsent) => void;
}) {
  const t = useTranslations("Cookies");
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs with localStorage (client-only) when the modal opens
      setAnalytics(getCookieConsent()?.analytics ?? false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-900/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-settings-title" className="text-lg font-semibold text-neutral-900">
            {t("modalTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex-shrink-0 text-neutral-400 transition-colors hover:text-neutral-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-sm text-neutral-600">{t("modalDescription")}</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {t("necessaryTitle")}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {t("necessaryDescription")}
              </p>
            </div>
            <span className="mt-0.5 flex-shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
              {t("alwaysActive")}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {t("analyticsTitle")}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {t("analyticsDescription")}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analytics}
              aria-label={t("analyticsTitle")}
              onClick={() => setAnalytics((v) => !v)}
              className={`relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                analytics ? "bg-primary-600" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  analytics ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 font-sans text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900"
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={() => onSave({ analytics })}
            className="rounded-full bg-primary-600 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
