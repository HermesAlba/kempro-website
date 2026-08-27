import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    // Full-viewport hero. Bleeds up behind the floating nav like every other
    // page's own first section — see HEADER_OFFSET in
    // components/layout/header.tsx — so the gradient reaches the very top
    // instead of stopping under the header. 92px/128px = the 54px/90px
    // header offset plus 38px (~1cm) less than before, which pushes the
    // block's bottom edge — and the footer right below it — back down by
    // that amount.
    <section
      className="relative -mt-[54px] flex min-h-[calc(100vh-92px)] items-center overflow-hidden pt-[54px] lg:-mt-[90px] lg:min-h-[calc(100vh-128px)] lg:pt-[90px]"
    >
      {/* Same two-layer treatment as the home Hero (see
          components/sections/hero.tsx): a static top-to-bottom indigo-to-white
          gradient, plus a separate animated white-dot layer on top (drifts
          down on a loop via .animate-dot-wave, see app/globals.css) —
          replaces the old bespoke blurred-fog + grain background so this
          page matches the home page's first block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(to bottom, #B1C4FF 0%, #CFDCFF 45%, white 100%)" }}
      />
      <div
        aria-hidden="true"
        className="animate-dot-wave pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <Container className="relative text-center">
        <FadeIn className="mx-auto max-w-2xl">
          <h1 className="text-[40px] font-bold leading-tight tracking-tight text-neutral-900 sm:text-[48px] lg:text-[56px]">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-neutral-700 sm:text-lg">{t("description")}</p>
          <div className="mt-8">
            <Link href="/" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
              {t("cta")}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
