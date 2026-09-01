import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

// Kempro's own take on Knife River's "Loving What We Do!" homepage block.
// Originally a framed photo next to a title/subtitle/CTA panel; per request
// the photo was removed entirely and the text now fills/centers the whole
// block instead of sharing it with an image column. Heading 40px/800/
// uppercase; 20px gap to subtitle; subtitle 16px/400; 35px gap to button;
// button solid-fill, 18px/30px padding, no radius, 15px/600/uppercase.
// Section vertical padding matches the site's other full-width text
// sections (py-16/py-20) now that there's no image dictating a fixed
// 430px block height.
export function LovingWhatWeDo() {
  const t = useTranslations("Home.lovingWhatWeDo");

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[32px] font-extrabold uppercase leading-[1.1] text-neutral-900 sm:text-[40px]">
            {t("title")}
          </h2>
          <p className="mt-5 text-[16px] leading-[24px] text-neutral-600">
            {t("subtitle")}
          </p>
          <div className="mt-[35px]">
            <Link
              href="/sobre-nosotros"
              className="inline-flex h-[53px] items-center justify-center bg-primary-600 px-[30px] font-sans text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
