import { cn } from "@/lib/utils";
import React from "react";
import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from "react-aria-components";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  RACLabelProps & {};

const Label = React.forwardRef<HTMLInputElement, LabelProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <RACLabel className={cn("flex py-1 px-1", className)} {...rest}>
      {children}
    </RACLabel>
  );
});

Label.displayName = "Label";

export { Label };
