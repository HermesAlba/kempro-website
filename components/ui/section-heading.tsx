export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        // font-sans (Montserrat): a bold uppercase label reads as UI chrome,
        // not body prose — <body>'s new default is Poppins (font-poppins).
        <p
          className={`font-sans text-sm font-semibold uppercase tracking-wide ${
            light ? "text-accent-300" : "text-primary-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-lg ${light ? "text-neutral-300" : "text-neutral-600"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
