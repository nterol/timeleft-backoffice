import { cva } from "cva";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-xs border capitalize",
  {
    variants: {
      variant: {
        primary: "bg-ui-primary/30 text-ui-primary border-ui-primary ",
        secondary:
          "bg-ui-secondary-100/30 text-ui-secondary-100 border-ui-secondary-100",
        ternary:
          "bg-ui-ternary-100/30 text-ui-ternary-100 border-ui-ternary-100",
      },

      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  }
);

export function Badge({
  children,
  className,
  variant,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  variant: "primary" | "secondary" | "ternary";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={twMerge(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
