import { cn } from "@/lib/utils";
import React from "react";
import { type IconProps } from "./interface";

export const IconMenu: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={cn("h-6 w-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
    </svg>
  );
};
