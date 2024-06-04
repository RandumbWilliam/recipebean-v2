import { cn } from "@/utils/cn";
import React from "react";
import { type IconProps } from "./interface";

export const IconMinus: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={cn("h-6 w-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 11h14v2H5z"></path>
    </svg>
  );
};
