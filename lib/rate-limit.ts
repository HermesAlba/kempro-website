// Minimal in-memory sliding-window rate limiter for Next.js API routes on
// Vercel's Node.js serverless runtime.
//
// How it works: a module-level Map persists for as long as the underlying
// Lambda instance stays warm (Vercel reuses instances across requests when
// traffic is frequent enough, only cold-starting a fresh one — with an
// empty Map — after a period of inactivity or when scaling out to handle
// concurrent load). That's a real limitation worth being explicit about:
// this does NOT enforce a hard global limit the way a shared store
// (Redis/Upstash) would — a distributed attacker hitting a cold start, or
// requests landing on different concurrent instances, can each get their
// own fresh counter. For a low/medium-traffic form like this one, it's
// still a meaningful deterrent against the common case (a script or a
// single bad actor hammering the endpoint from one IP), and needs zero
// extra infrastructure or third-party account to run. If abuse ever
// becomes a real, sustained problem, the next step up is
// @upstash/ratelimit backed by Upstash Redis (a shared store, so the
// limit is enforced consistently across every instance) — but that's
// deliberately not what this is.
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Opportunistic cleanup (run at most once per interval, piggy-backing on a
// real request rather than a background timer) so the Map can't grow
// unbounded over a long-lived warm instance.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
  lastCleanup = now;
}

/**
 * Returns whether `key` has exceeded `limit` requests within the trailing
 * `windowMs`, and (when limited) how many seconds until it resets.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  cleanup(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  const limited = bucket.count > limit;
  return { limited, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
}

/** Best-effort client IP from the headers Vercel's proxy sets. Falls back
 * to a constant so requests without either header still share one bucket
 * instead of bypassing the limit entirely. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
