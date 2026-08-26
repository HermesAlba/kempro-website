// Shared with app/[locale]/casos-de-exito/[slug]/page.tsx — same block shape
// and typography as the blog's own article body, so long-form content reads
// identically across the site regardless of which page renders it.
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "heading") {
    return <h2 className="text-[24px] font-bold text-neutral-900">{block.text}</h2>;
  }

  if (block.type === "list") {
    // Small accent-400 dot instead of the browser's default list-disc
    // bullet (dark, oversized) — same idea as ServiceCard's CheckIcon
    // marker (components/sections/service-card.tsx: a colored marker
    // instead of a plain dark dot) but plainer, since not every list here
    // is a "benefits" list a checkmark implies.
    return (
      <ul className="space-y-2 text-[16px] leading-[1.6] text-neutral-700">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-[16px] leading-[1.6] text-neutral-700">{block.text}</p>;
}
