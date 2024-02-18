import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";

const buttonVariants = cva(
  [
    "inline-flex",
    "gap-2",
    "align-middle",
    "justify-center",
    "items-center",
    "whitespace-nowrap",
    "rounded-lg",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "outline-none",
    "ring-offset-2",
    "focus-visible:ring-2",
    "ring-brink-pink-500/70",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-brink-pink-500", "text-white", "hover:bg-brink-pink-700"],
        secondary: [
          "border-2",
          "border-brink-pink-500",
          "text-brink-pink-500",
          "hover:bg-brink-pink-500",
          "hover:text-white",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-4"],
        default: ["text-base", "py-2", "px-8"],
        large: ["text-lg", "py-3", "px-12"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Spinner = () => (
  <div className="absolute">
    <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]" />
  </div>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  RACButtonProps &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, variant, size, loading, isDisabled, ...rest } =
      props;

    return (
      <RACButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...rest}
        isDisabled={isDisabled || loading}
      >
        {loading && <Spinner />}
        <span
          className={clsx("transition", {
            "opacity-0": loading,
            "opacity-100": !loading,
          })}
        >
          {children}
        </span>
      </RACButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
