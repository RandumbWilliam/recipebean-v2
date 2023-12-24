"use client";

import { mergeProps } from "@/lib/merge-props";
import { mergeRefs } from "@/lib/merge-refs";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { forwardRef, useRef } from "react";
import {
  useButton,
  useFocusRing,
  useHover,
  type AriaButtonProps,
} from "react-aria";

const buttonVariants = cva(
  [
    "inline-flex",
    "gap-2",
    "align-middle",
    "justify-center",
    "items-center",
    "whitespace-nowrap",
    "rounded-lg",
    "font-medium",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brink-pink-500",
          "text-white",
          "enabled:hover:bg-brink-pink-700",
          "disabled:opacity-50",
        ],
        secondary: [
          "border-2",
          "border-brink-pink-500",
          "text-brink-pink-500",
          "enabled:hover:bg-brink-pink-500",
          "enabled:hover:text-white",
          "disabled:opacity-50",
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
  AriaButtonProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const { children, className, variant, size, loading, disabled, ...rest } =
      props;
    const ref = useRef<HTMLButtonElement>(null);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({
      ...props,
      isDisabled: disabled,
    });
    const { buttonProps, isPressed } = useButton(
      {
        ...rest,
        isDisabled: disabled,
      },
      ref
    );

    return (
      <button
        ref={mergeRefs([ref, forwardedRef])}
        className={cn(buttonVariants({ variant, size, className }))}
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
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
      </button>
    );
  }
);

Button.defaultProps = {
  variant: "primary",
  size: "default",
  loading: false,
  disabled: false,
};

Button.displayName = "Button";

export { Button, buttonVariants };
