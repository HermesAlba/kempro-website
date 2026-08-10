"use client";

import { useTranslations } from "next-intl";
import { buildKemproVCard } from "@/lib/vcard";
import { DownloadIcon } from "@/components/ui/icons";

export function AddToContactsButton() {
  const t = useTranslations("Contact");
  const href = `data:text/vcard;charset=utf-8,${encodeURIComponent(buildKemproVCard())}`;

  return (
    <a
      href={href}
      download="Kempro-SAS.vcf"
      className="inline-flex items-center gap-1.5 text-[13px] text-primary-light hover:text-white"
    >
      {t("addToContacts")}
      <DownloadIcon className="h-3 w-3 flex-shrink-0" />
    </a>
  );
}
