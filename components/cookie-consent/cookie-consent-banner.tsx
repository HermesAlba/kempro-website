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
        <div className="fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:bottom-6 sm:left-6">
          <div className="max-w-sm rounded-2xl bg-white p-6 shadow-xl ring-1 ring-neutral-200/70">
            <p className="text-sm text-neutral-700">
              {t("bannerIntro")}{" "}
              <Link
                href={{ pathname: "/aviso-de-privacidad", hash: "cookies" }}
                className="text-primary-600 underline hover:text-primary-700"
              >
                {t("policyLink")}
              </Link>{" "}
              {t("or")}{" "}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-primary-600 underline hover:text-primary-700"
              >
                {t("manageLink")}
              </button>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleDecision({ analytics: true })}
                className="rounded-full bg-primary-600 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                {t("acceptAll")}
              </button>
              <button
                type="button"
                onClick={() => handleDecision({ analytics: false })}
                className="rounded-full border border-neutral-300 px-5 py-2.5 font-sans text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                {t("rejectAll")}
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
