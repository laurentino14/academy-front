import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

export function Button({ className, children, intent, ...rest }: ButtonProps) {
  return (
    <button className={clsx(styles({ intent }), className)} {...rest}>
      {children}
    </button>
  );
}

const styles = cva("font-medium px-3 py-3 rounded-md", {
  variants: {
    intent: {
      white: "bg-white hover:bg-opacity-95 text-gray",
      primary: "bg-primary hover:bg-opacity-95 text-white",
    },
  },
  defaultVariants: {
    intent: "white",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof styles> {}
