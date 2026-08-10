"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getCookieConsent, setCookieConsent, type CookieConsent } from "@/lib/cookie-consent";
import { CookieSettingsModal } from "./cookie-settings-modal";

export function CookieConsentBanner() {
  const t = useTranslations("Cookies");
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Reading localStorage (client-only) can't happen during the initial
    // render, so the banner's visibility is determined right after mount.
    if (!getCookieConsent()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function handleDecision(consent: CookieConsent) {
    setCookieConsent(consent);
    setVisible(false);
  }

  function handleSaveFromModal(consent: CookieConsent) {
    setCookieConsent(consent);
    setVisible(false);
    setModalOpen(false);
  }

  return (
    <>
      {visible ? (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200 bg-white px-4 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-600">
              {t("bannerIntro")}{" "}
              <Link
                href={{ pathname: "/aviso-de-privacidad", hash: "cookies" }}
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                {t("policyLink")}
              </Link>{" "}
              {t("or")}{" "}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                {t("manageLink")}
              </button>
              .
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                type="button"
                onClick={() => handleDecision({ analytics: false })}
                className="rounded-full border border-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
              >
                {t("rejectAll")}
              </button>
              <button
                type="button"
                onClick={() => handleDecision({ analytics: true })}
                className="rounded-full border border-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <CookieSettingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveFromModal}
      />
    </>
  );
}
