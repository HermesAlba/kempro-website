import { FadeIn } from "@/components/ui/fade-in";
import type { CustomerReview } from "@/lib/data/customer-stories";

function ReviewColumn({
  source,
  reviews,
  readMoreLabel,
  emptyLabel,
}: {
  source: string;
  reviews: CustomerReview[];
  readMoreLabel: string;
  emptyLabel: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[15px] font-bold uppercase tracking-wide text-neutral-900">{source}</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-[15px] leading-relaxed text-neutral-800">&ldquo;{review.quote}&rdquo;</p>
            {review.reviewerRole ? (
              <p className="mt-3 text-[13px] text-neutral-500">{review.reviewerRole}</p>
            ) : null}
            {review.link ? (
              <a
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[13px] font-semibold text-[var(--color-hc-blue)] hover:underline"
              >
                {readMoreLabel}
              </a>
            ) : null}
          </div>
        ))
      ) : (
        <p className="text-[14px] text-neutral-500">{emptyLabel}</p>
      )}
    </div>
  );
}

export function HcReviews({
  reviews,
  title,
  readMoreLabel,
  emptyLabel,
}: {
  reviews: CustomerReview[];
  title: string;
  readMoreLabel: string;
  emptyLabel: string;
}) {
  const gartnerReviews = reviews.filter((review) => review.source === "Gartner");
  const g2Reviews = reviews.filter((review) => review.source === "G2");

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn>
          <h2 className="text-[20px] font-bold text-neutral-900">{title}</h2>
        </FadeIn>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <FadeIn>
            <ReviewColumn
              source="Gartner"
              reviews={gartnerReviews}
              readMoreLabel={readMoreLabel}
              emptyLabel={emptyLabel}
            />
          </FadeIn>
          <FadeIn delay={100}>
            <ReviewColumn
              source="G2"
              reviews={g2Reviews}
              readMoreLabel={readMoreLabel}
              emptyLabel={emptyLabel}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
