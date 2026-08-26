export const COOKIE_CONSENT_KEY = "kempro-cookie-consent";
export const COOKIE_CONSENT_EVENT = "kempro-cookie-consent-change";

export type CookieConsent = {
  analytics: boolean;
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
}
