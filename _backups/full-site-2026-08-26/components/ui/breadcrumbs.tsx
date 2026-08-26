import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/components/ui/icons";

export type BreadcrumbItem = {
  label: string;
  /** Omit to render as plain text instead of a link (e.g. the current page). */
  href?: "/" | "/blog" | "/casos-de-exito" | "/HC" | "/servicios";
};

// Site-wide breadcrumb trail. Use on any page that isn't itself reachable
// from the header or footer navigation (e.g. a blog post detail page) so
// visitors always have a path back up the hierarchy. Every item with an
// `href` renders as a link — the trail doesn't have to end on an unlinked
// "current page" item (it often stops one level short, e.g. "Home > Blog",
// without repeating the article title that's already the page's own H1).
export function Breadcrumbs({
  items,
  linkClassName = "text-primary-600 hover:underline",
}: {
  items: BreadcrumbItem[];
  /** Overrides the linked items' color — e.g. the blog article header uses
   * a neutral tone instead of the default indigo so it doesn't compete
   * with the header's own indigo gradient. */
  linkClassName?: string;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[13px]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <ChevronRightIcon className="h-3.5 w-3.5 flex-shrink-0 text-neutral-900" />
            ) : null}
            {item.href ? (
              <Link href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-neutral-500">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
