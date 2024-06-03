import { AvatarUrls } from "@/data/avatarUrls";
import { UserResponseFragment } from "@/graphql/operations";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  className?: string;
  user: UserResponseFragment;
}

const Avatar: React.FC<AvatarProps> = ({ className, user }) => {
  return (
    <>
      <div
        className={cn(
          "relative h-12 w-12 rounded-xl cursor-pointer overflow-hidden",
          className
        )}
      >
        <Image
          src={AvatarUrls[user.avatarId]}
          alt="avatar-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </>
  );
};

export default Avatar;
