import { cn } from "@/utils/cn";
import React, { useState } from "react";
import {
  Input as RACInput,
  type InputProps as RACInputProps,
} from "react-aria-components";
import { IconHide, IconShow } from "../icons";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  RACInputProps & {};

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative w-full">
        <RACInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-primary/70",
            className
          )}
          {...rest}
        />
        <button
          type="button"
          className="absolute right-2 top-2.5 text-gray-400"
          onMouseDown={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconHide /> : <IconShow />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
