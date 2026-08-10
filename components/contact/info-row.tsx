import type { ComponentType } from "react";

type IconProps = { className?: string };

export function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<IconProps>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-dark-800">
        <Icon className="h-[18px] w-[18px] text-primary-light" />
      </span>
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[1px] text-neutral-400">
          {label}
        </p>
        <div className="mt-0.5 text-[13px] text-white">{children}</div>
      </div>
    </div>
  );
}
