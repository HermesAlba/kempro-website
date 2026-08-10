"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon, CopyIcon, CheckIcon } from "@/components/ui/icons";

const WHATSAPP_DIGITS = "573104623473";
const DISPLAY_NUMBER = "+57 310 462 3473";

export function WhatsAppMenu() {
  const t = useTranslations("Contact");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(DISPLAY_NUMBER);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    } catch {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-left text-[13px] text-white hover:text-primary-light"
      >
        {DISPLAY_NUMBER}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-neutral-200 bg-white py-1.5 text-left shadow-lg"
        >
          <a
            role="menuitem"
            href={`https://wa.me/${WHATSAPP_DIGITS}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-accent-600" />
            <span>{t("whatsapp.chat", { number: DISPLAY_NUMBER })}</span>
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 flex-shrink-0 text-success-500" />
            ) : (
              <CopyIcon className="h-4 w-4 flex-shrink-0 text-neutral-500" />
            )}
            <span>{copied ? t("whatsapp.copied") : t("whatsapp.copy")}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
