"use client";

import { useEffect } from "react";

// Fixes a real bug reported on mobile: opening the site fresh sometimes
// left the header scrolled out of view above the fold (user had to
// manually scroll up to see it). Root cause — the browser's own
// scrollRestoration default ("auto") restoring a previous scrollY on
// what looks like a fresh open but is actually a history-backed
// navigation (iOS Safari tab resume/bfcache restore, PWA relaunch,
// backgrounded-tab reopen, etc.). <Header> is a normal in-flow element
// (position: relative, not sticky/fixed — see header.tsx), so a
// restored non-zero scroll position leaves it rendered off-screen with
// nothing pulling it back into view. Mounted once at the root layout
// (app/[locale]/layout.tsx) since that layout persists across
// client-side route changes, so this only fires on an actual fresh
// page load — not on every in-app navigation.
export function ScrollRestorationFix() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
