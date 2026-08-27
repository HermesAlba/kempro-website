import Image from "next/image";

type Client = {
  name: string;
  logo: { src: string; width: number; height: number };
  imageClassName?: string;
};

const defaultImageClassName = "h-10 w-auto max-w-32 object-contain";

const clients: Client[] = [
  {
    name: "Bupa",
    logo: { src: "/logos/bupa.png", width: 646, height: 171 },
  },
  {
    name: "Cajasan",
    logo: { src: "/logos/cajasan.png", width: 368, height: 84 },
  },
  {
    name: "Best Doctors Insurance",
    logo: { src: "/logos/bdi.png", width: 408, height: 108 },
    imageClassName: "h-[45px] w-auto max-w-[170px] object-contain",
  },
  {
    name: "Studio Sur",
    logo: { src: "/logos/studiosur.svg", width: 592, height: 113 },
  },
  {
    name: "Siete",
    logo: { src: "/logos/siete.png", width: 1088, height: 706 },
  },
  {
    name: "Ventanas y Fachadas",
    logo: { src: "/logos/vyf.png", width: 374, height: 87 },
    // VyF's lockup is wider/shorter (374:87) than Bupa's (646:171), so under
    // the shared default classes both hit the same max-w-32 box but VyF's
    // own aspect ratio leaves it visibly shorter once object-contain
    // letterboxes it inside that box. Bupa's own effective rendered height
    // under the default classes is 128px / (646/171) ≈ 33.9px — setting
    // that height explicitly here (with a max-width comfortably above the
    // resulting ~145.7px auto-width, so nothing re-clamps it) makes height
    // the sole binding constraint, matching Bupa's visual height exactly
    // while keeping VyF's own proportions undistorted.
    imageClassName: "h-[33.9px] w-auto max-w-[160px] object-contain",
  },
];

// Repeated 4x so the marquee track is comfortably wider than any viewport —
// the animation translates by exactly one copy's width (-25%), so the loop
// point is seamless no matter how many logos the list actually has.
const loopClients = [...clients, ...clients, ...clients, ...clients];

export function ClientLogos({
  title,
  grayscale = false,
  background = "white",
}: {
  title?: string;
  /** Renders every logo in black-and-white instead of its original colors. */
  grayscale?: boolean;
  /** "white" (default) = bg-white with a bordered strip, used on Home/HC.
   * "transparent" = no background/border of its own, so it blends into
   * whatever the page behind it already looks like. */
  background?: "white" | "transparent";
}) {
  return (
    // relative z-10 so this always paints above a decorative absolute
    // background from an ancestor (e.g. the Home page's shared hero
    // gradient — see app/[locale]/page.tsx) when used with
    // background="transparent"; harmless no-op for the "white" usages
    // elsewhere (casos-de-exito, HC), since there's nothing behind them to
    // stack against.
    <section
      className={`relative z-10 ${background === "white" ? "border-y border-neutral-200 bg-white py-4" : "py-4"}`}
    >
      {title ? (
        <p className="mx-auto mb-3 max-w-[1280px] px-6 text-center text-[13px] font-semibold text-neutral-500 sm:px-10 lg:px-20">
          {title}
        </p>
      ) : null}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-logo-scroll flex w-max items-center gap-x-16">
          {loopClients.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              className="flex flex-shrink-0 items-center justify-center"
            >
              <Image
                src={client.logo.src}
                width={client.logo.width}
                height={client.logo.height}
                alt={client.name}
                className={`${client.imageClassName ?? defaultImageClassName} ${grayscale ? "grayscale" : ""}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
