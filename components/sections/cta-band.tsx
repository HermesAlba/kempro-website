import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

export function CtaBand({
  title,
  subtitle,
  cta,
  background = "dark",
}: {
  title: string;
  subtitle: string;
  cta: string;
  /** "dark" (default) = plain bg-dark-900, used on Home/Servicios. "blue-grid"
   * = the same #5D5FEF→#4949D6 brand gradient and white graph-paper grid
   * used by the "Recibe nuestras ideas" newsletter block on /blog, but no
   * card/icon — just the colored grid backdrop behind the text. */
  background?: "dark" | "blue-grid";
}) {
  return (
    <section
      // Fixed min-height (shared with the "Empieza aquí" strategy section on
      // Servicios) instead of letting py-20/py-24 size the section purely
      // from content — guarantees both bands render at the same height even
      // though "Empieza aquí" has an extra eyebrow line and a longer
      // subtitle. flex + items-center keeps shorter content vertically
      // centered inside that fixed box.
      // 384px = 6 grid cells (backgroundSize is 64px 64px below) — matches
      // the original "Hablemos sobre..." height exactly. Shared with the
      // "Empieza aquí" strategy section on Servicios so both render at the
      // same size regardless of how much text each one has.
      className={`relative flex min-h-[384px] items-center overflow-hidden py-12 ${background === "dark" ? "bg-dark-900" : ""}`}
      style={
        background === "blue-grid"
          ? { backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #4949D6 100%)" }
          : undefined
      }
    >
      {background === "blue-grid" ? (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      ) : null}

      <Container className="relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-300">{subtitle}</p>
          <div className="mt-8">
            {/* Same header "Contáctanos" button (ctaButtonClasses) on every
                background variant. NOTE: on "dark" (bg-dark-900 = #0f172a),
                this is the exact same color as ctaButtonClasses' own
                bg-neutral-900 (#0f172a) — the button is effectively
                invisible except on hover. Pending fix, tracked separately. */}
            <Link href="/contacto" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
              {cta}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
