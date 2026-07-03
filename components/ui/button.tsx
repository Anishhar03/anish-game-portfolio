import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-mono text-xs font-bold uppercase transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[#d5ff57] bg-[#d5ff57] text-[#07100d] hover:bg-[#e2ff86]",
        outline: "border-white/20 bg-black/30 text-white hover:border-[#79ffbb] hover:text-[#d5ff57]",
        danger: "border-[#ff6577] bg-[#ff6577]/10 text-[#ff8b99] hover:bg-[#ff6577]/20",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
