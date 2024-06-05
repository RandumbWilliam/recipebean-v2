import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  className?: string;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, src }) => {
  return (
    <div
      className={cn("relative h-12 w-12 rounded-xl overflow-hidden", className)}
    >
      <Image
        src={src}
        alt="avatar-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Avatar;
