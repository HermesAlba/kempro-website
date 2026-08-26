"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowUpIcon } from "@/components/ui/icons";
import { COOKIE_CONSENT_EVENT, getCookieConsent } from "@/lib/cookie-consent";

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const t = useTranslations("Common");
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  // The cookie banner is a full-width bar pinned to the bottom of the
  // viewport — while it's up, this button needs to sit above it instead of
  // being hidden underneath.
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Reading localStorage (client-only) can't happen during the initial
    // render, so this is determined right after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBannerVisible(!getCookieConsent());
    const onConsentChange = () => setBannerVisible(false);
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
  }, []);

  function handleClick() {
    if (shouldReduceMotion) {
      window.scrollTo(0, 0);
      return;
    }
    // Reuses the same animate() primitive as AnimatedCounter instead of the
    // native scrollTo({behavior:"smooth"}) — keeps this in the same motion
    // system as the rest of the site, and gives control over duration/easing.
    animate(window.scrollY, 0, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-[opacity,color,border-color,bottom] duration-300 hover:border-neutral-300 hover:text-neutral-900 sm:right-8 ${
        bannerVisible ? "bottom-32 sm:bottom-24" : "bottom-6 sm:bottom-8"
      } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
}
