import React from "react";
import { defaultProps, type IconProps } from "./interface";

export const IconMenu: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
    </svg>
  );
};

IconMenu.defaultProps = defaultProps;
