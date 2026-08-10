import type { TeamMember } from "@/lib/data/team";
import { FadeIn } from "@/components/ui/fade-in";

export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member, index) => (
        <FadeIn
          key={member.name}
          delay={index * 100}
          direction={index % 2 === 0 ? "up" : "left"}
        >
          <div className="text-center">
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-2xl font-bold text-white"
              aria-hidden="true"
            >
              {member.initials}
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">{member.role}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
