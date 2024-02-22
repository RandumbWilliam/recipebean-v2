import { useMyUserQuery } from "@/graphql/hooks";
import { isServer } from "@/utils/isServer";
import { twTheme } from "@/utils/twConfig";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconMenu, IconX } from "./icons";
import Avatar from "./ui/Avatar";
import { Button, buttonVariants } from "./ui/Button";
import Logo from "./ui/Logo";

const BREAKPOINT_MD = parseInt(twTheme.screens.md.slice(0, -2));

const AuthHeader = () => {
  const [{ data }] = useMyUserQuery({
    pause: isServer(),
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINT_MD) {
        document.body.classList.remove("overflow-hidden");

        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNav = () => {
    if (!isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsOpen(!isOpen);
  };

  return (
    <header className="relative w-full py-2 md:py-4 bg-white z-50">
      <div className="wrapper flex items-center justify-between">
        <Link href="/">
          <Logo className="h-8 md:h-12" />
        </Link>
        <div className="flex justify-end gap-3">
          {data?.myUser && (
            <Avatar className="md:h-16 md:w-16" user={data.myUser} />
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
