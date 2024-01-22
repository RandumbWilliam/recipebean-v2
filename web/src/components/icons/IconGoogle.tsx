import { cn } from "@/lib/utils";
import React from "react";
import { type IconProps } from "./interface";

export const IconGoogle: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={cn("h-6 w-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g clip-path="url(#clip0_463_23)">
        <path
          d="M12.2363 9.81812V14.4654H18.5951C18.3159 15.96 17.4779 17.2255 16.2212 18.0764L20.0558 21.0982C22.29 19.0037 23.5789 15.9273 23.5789 12.2728C23.5789 11.4219 23.5038 10.6036 23.3641 9.81825L12.2363 9.81812Z"
          fill="#4285F4"
        />
        <path
          d="M5.61411 14.2839L4.74927 14.9563L1.68799 17.3781C3.63213 21.2944 7.61681 23.9999 12.2355 23.9999C15.4255 23.9999 18.1 22.9308 20.055 21.0981L16.2204 18.0763C15.1678 18.7963 13.8251 19.2327 12.2355 19.2327C9.16352 19.2327 6.55349 17.1273 5.61894 14.2909L5.61411 14.2839Z"
          fill="#34A853"
        />
        <path
          d="M1.68826 6.6217C0.88272 8.23619 0.420898 10.058 0.420898 11.9998C0.420898 13.9416 0.88272 15.7635 1.68826 17.3779C1.68826 17.3888 5.6196 14.2798 5.6196 14.2798C5.38329 13.5598 5.24362 12.7962 5.24362 11.9997C5.24362 11.2032 5.38329 10.4396 5.6196 9.71964L1.68826 6.6217Z"
          fill="#FBBC05"
        />
        <path
          d="M12.2357 4.77819C13.9758 4.77819 15.5225 5.38908 16.7577 6.56728L20.1412 3.13096C18.0896 1.18917 15.4259 0 12.2357 0C7.61705 0 3.63213 2.69455 1.68799 6.62184L5.6192 9.72003C6.55362 6.88363 9.16376 4.77819 12.2357 4.77819Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_463_23">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
