"use client";

import { useEffect } from "react";
import { CalendarIcon } from "@/components/ui/icons";
import { KEMPRO_PRIMARY } from "@/lib/kempro-symbol";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

const CAL_LINK = "kemprocol/llamada-de-consultoria-kempro";
const CAL_NAMESPACE = "llamada-de-consultoria-kempro";

declare global {
  interface Window {
    Cal?: CalQueue;
  }
}

type CalQueue = {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalQueue>;
  q?: unknown[];
};

// Official Cal.com embed snippet (https://cal.com/embed), adapted to
// TypeScript. It lazily loads embed.js and queues commands issued before
// the real script has loaded, so the queue is preserved verbatim.
function loadCalEmbed() {
  if (typeof window === "undefined" || window.Cal) return;

  const enqueue = (target: CalQueue, args: unknown[]) => {
    target.q = target.q ?? [];
    target.q.push(args);
  };

  const cal: CalQueue = (...args: unknown[]) => {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q ?? [];
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const namespaceQueue: CalQueue = (...nsArgs: unknown[]) => {
          enqueue(namespaceQueue, nsArgs);
        };
        cal.ns = cal.ns ?? {};
        cal.ns[namespace] = cal.ns[namespace] ?? namespaceQueue;
        enqueue(cal.ns[namespace], args);
        enqueue(cal, ["initNamespace", namespace]);
      } else {
        enqueue(cal, args);
      }
      return;
    }

    enqueue(cal, args);
  };

  window.Cal = cal;

  cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });
  cal.ns?.[CAL_NAMESPACE]?.("ui", {
    theme: "light",
    styles: { branding: { brandColor: KEMPRO_PRIMARY } },
    layout: "month_view",
  });
}

export function CalBookingButton({
  className,
  variant = "outline",
  children,
}: {
  className?: string;
  /** "solid" is used when this is a page's primary CTA; "text" drops the
   * button chrome entirely (no bg/border) for an icon+label link with
   * just a subtle color shift on hover; "dark" reuses the header's own
   * "Contáctanos" button style verbatim (same black background, 13px
   * label, indigo hover, no icon) for pages that want that exact CTA
   * look instead of the brand-purple solid/outline treatments. */
  variant?: "solid" | "outline" | "text" | "dark";
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadCalEmbed();
  }, []);

  const variantClasses =
    variant === "solid"
      ? "rounded-lg bg-primary-600 text-white hover:bg-primary-700 px-4 py-3.5 text-[13px]"
      : variant === "text"
        ? "text-primary-600 hover:text-primary-700 hover:underline text-[16px]"
        : variant === "dark"
          ? `${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`
          : "rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-3.5 text-[13px]";
  // Matches the size of the icon-only contact-channel circles (h-[18px])
  // when this is a plain icon+label link, instead of the smaller icon used
  // inside the solid/outline button chrome. "dark" shows no icon at all,
  // matching Contáctanos.
  const iconClasses = variant === "text" ? "h-[18px] w-[18px]" : "h-3.5 w-3.5";

  return (
    <button
      type="button"
      className={
        variant === "dark"
          ? `${variantClasses} ${className ?? ""}`
          : `inline-flex items-center justify-center gap-2 transition-colors ${variantClasses} ${className ?? ""}`
      }
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
    >
      {variant === "text" ? <CalendarIcon className={`${iconClasses} flex-shrink-0`} /> : null}
      {children}
      {variant !== "text" && variant !== "dark" ? (
        <CalendarIcon className={`${iconClasses} flex-shrink-0`} />
      ) : null}
    </button>
  );
}
