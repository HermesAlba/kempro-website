import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn } from "@/components/ui/fade-in";
import { JoiningHalves } from "@/components/ui/joining-halves";

export function HcHero({
  breadcrumbBlogLabel,
  homeLabel,
  eyebrow,
  title,
  subtitle,
}: {
  breadcrumbBlogLabel: string;
  homeLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    // Bleeds up behind the floating nav like every other page hero (see
    // HEADER_OFFSET in components/layout/header.tsx). min-h on the inner
    // wrapper gives the absolutely-positioned JoiningHalves layer something
    // to fill — JoiningHalves itself must stay purely decorative (it
    // renders its children twice, clipped to each half), so the real
    // breadcrumb/heading content is a separate sibling layered on top, not
    // passed through it.
    <section className="-mt-[81px] pt-[81px] lg:-mt-[157px] lg:pt-[157px]">
      <div className="relative min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[560px]">
        <JoiningHalves
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--color-hc-blue) 0%, var(--color-hc-blue-dark) 100%)",
          }}
        >
          {/* "Ondas" — two layered wave shapes in white at low opacity,
              anchored to the bottom edge, giving the flat gradient a soft
              sense of motion without competing with the text above it. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-[0.12]"
          >
            <path
              fill="#ffffff"
              d="M0,120 C240,180 480,60 720,90 C960,120 1200,200 1440,140 L1440,220 L0,220 Z"
            />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-2/5 w-full opacity-[0.18]"
          >
            <path
              fill="#ffffff"
              d="M0,160 C300,100 600,180 900,140 C1140,108 1320,150 1440,120 L1440,220 L0,220 Z"
            />
          </svg>
        </JoiningHalves>

        <div className="relative px-6 pt-6 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-[1280px]">
            {/* No trailing unlinked "current page" item, matching every
                other dark-hero breadcrumb on the site (e.g. the case-study
                detail page) — its label would just repeat this section's
                own H1 below, and the Breadcrumbs component's unlinked-item
                color (neutral-500) has poor contrast against a colored
                background. */}
            <Breadcrumbs
              items={[
                { label: homeLabel, href: "/" },
                { label: breadcrumbBlogLabel, href: "/blog" },
              ]}
              linkClassName="text-white/80 hover:text-white hover:underline"
            />
          </div>
        </div>

        <FadeIn className="relative mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 py-20 text-center sm:px-10 sm:py-28">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">
            {eyebrow}
          </p>
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]">
            {title}
          </h1>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-white/85">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
}
