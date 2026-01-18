import { twMerge } from "tailwind-merge";

export function CardWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-b-neutral-900 bg-neutral-900/50 h-fit p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
