import { cn } from "@/utils/cn";
import React from "react";
import {
  Input as RACInput,
  type InputProps as RACInputProps,
} from "react-aria-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  RACInputProps & {};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <RACInput
      ref={ref}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-brink-pink-500/70",
        className
      )}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };
