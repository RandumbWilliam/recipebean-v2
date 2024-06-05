import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./ui/Logo";

interface SidebarProps {
  className?: string;
  imageSrc: string;
  text?: string;
}

const AuthSidebar: React.FC<SidebarProps> = ({ className, imageSrc, text }) => {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-col items-center justify-center h-full bg-primary/70 w-[580px]",
        className
      )}
    >
      <Link href="/">
        <Logo className="absolute text-white h-10 top-10 left-16" />
      </Link>
      <Image
        src={imageSrc}
        alt="hero"
        width={1000}
        height={1000}
        priority
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
      />
      {text && (
        <h2 className="text-4xl font-medium max-w-lg text-white text-center">
          {text}
        </h2>
      )}
    </div>
  );
};

export default AuthSidebar;
