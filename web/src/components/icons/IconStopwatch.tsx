import { cn } from "@/utils/cn";
import React from "react";
import { type IconProps } from "./interface";

export const IconStopwatch: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={cn("h-6 w-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
      <path d="M11 9h2v5h-2zM9 2h6v2H9zm10.293 5.707-2-2 1.414-1.414 2 2z"></path>
    </svg>
  );
};
