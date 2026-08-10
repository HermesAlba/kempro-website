"use client";

import { useEffect } from "react";
import { CalendarIcon } from "@/components/ui/icons";
import { KEMPRO_PRIMARY } from "@/lib/kempro-symbol";

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
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadCalEmbed();
  }, []);

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3.5 text-[13px] text-white transition-colors hover:bg-primary-700 ${className ?? ""}`}
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
    >
      {children}
      <CalendarIcon className="h-3.5 w-3.5 flex-shrink-0" />
    </button>
  );
}
