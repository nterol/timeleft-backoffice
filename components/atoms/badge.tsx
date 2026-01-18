import { cva } from 'cva';


const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2 py-1 text-xs border",
    {
        variants: {
            variant: {
                primary: "bg-ui-primary/30 text-ui-primary border-ui-primary ",
                secondary: "bg-ui-secondary-100/30 text-ui-secondary-100 border-ui-secondary-100",
                ternary: "bg-ui-ternary-100/30 text-ui-ternary-100 border-ui-ternary-100",

            }
        }
    }
)

export function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant: "primary" | "secondary" | "ternary" }) {
    return (
        <span className={badgeVariants({ variant, className })}>
            {children}
        </span>
    )
}