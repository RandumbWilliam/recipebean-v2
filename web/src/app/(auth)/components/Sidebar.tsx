import Logo from "@/components/elements/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  imageSrc: string;
  text?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ imageSrc, text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-brink-pink-200 w-[720px]">
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
        <h2 className="h2-bold max-w-xl text-white text-center">{text}</h2>
      )}
    </div>
  );
};

export default Sidebar;
