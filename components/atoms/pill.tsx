import { cva } from "cva";

const pillStyles = cva(
  "inline-flex items-center rounded-full p-1 aspect-square text-white",
  {
    variants: {
      variant: {
        primary: "bg-ui-primary",
        secondary: "bg-ui-secondary-100",
        ternary: "bg-ui-ternary-100",
      },
    },
  }
);

export const Pill = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ternary";
}) => <span className={pillStyles({ variant })}>{children}</span>;
