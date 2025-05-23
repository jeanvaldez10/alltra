import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:border transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:shadow-button-inner-hover disabled:bg-primary/10 disabled:text-foreground/30 focus-visible:border-foreground",
        primary2:
          "bg-foreground text-background hover:shadow-button-inner-hover disabled:bg-foreground/10 disabled:text-foreground/30 focus-visible:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-button-inner-hover hover:bg-secondary/80 disabled:bg-secondary/30 focus-visible:border-secondary-foreground",
        secondary2: "bg-primary/10 text-primary/60 hover:shadow-button-inner-hover hover:text-primary disabled:bg-primary/5 focus-visible:border-primary focus-visible:text-primary",
        tertiary: "border border-primary text-primary hover:shadow-button-inner-hover hover:border-primary/60 hover:text-primary/60 disabled:bg-foreground/0 disabled:border-foreground/20 disabled:text-foreground/20 focus-visible:text:primary focus-visible:bg-foreground/0 focus-visible:border-foreground/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:shadow-button-inner-hover hover:bg-destructive/90 disabled:bg-destructive/30 focus-visible:border-secondary-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-full",
        xs: "h-8 px-3 rounded-full text-xs",
        sm: "h-9 px-4 rounded-full text-sm",
        lg: "h-11 px-6 rounded-full text-base",
        xl: "h-12 px-8 rounded-full text-lg",
        icon: "h-10 w-10 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
