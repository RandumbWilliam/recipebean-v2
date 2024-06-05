import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AvatarUrls } from "@/data/avatarUrls";
import { useLogoutMutation, useMyUserQuery } from "@/graphql/hooks";
import { isServer } from "@/utils/isServer";
import { twTheme } from "@/utils/twConfig";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconLogout, IconMenu, IconX } from "./icons";
import Avatar from "./ui/Avatar";
import Logo from "./ui/Logo";

const BREAKPOINT_MD = parseInt(twTheme.screens.md.slice(0, -2));

function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 h-screen w-screen bg-white transform transition-transform duration-300 ease-in-out filter",
        {
          "-translate-y-0": isOpen,
          "-translate-y-full": !isOpen,
        }
      )}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <div className="flex flex-col gap-3">
          <Button variant="secondary">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [{ data }] = useMyUserQuery({
    pause: isServer(),
  });

  const [, logout] = useLogoutMutation();

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

  const handleLogout = async () => {
    await logout({});
  };

  return (
    <>
      <header className="fixed w-full py-2 md:py-4 bg-white z-50">
        <div className="container flex items-center justify-between h-20">
          <Link href="/">
            <Logo className="h-8 md:h-12" />
          </Link>
          <div className="hidden md:flex justify-end">
            {data?.myUser ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar
                    className="md:h-16 md:w-16"
                    src={AvatarUrls[data.myUser.avatarId]}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-60" align="end">
                  <div className="grid gap-4">
                    <button
                      className="flex items-center gap-3 hover:text-primary font-medium"
                      onClick={handleLogout}
                    >
                      <IconLogout />
                      <p>Log out</p>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/signin"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Log In
                </Link>
                <Link href="/signup" className={buttonVariants()}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={toggleNav}>
              {isOpen ? (
                <IconX className="h-8 w-8 text-primary" />
              ) : (
                <IconMenu className="h-8 w-8 text-primary" />
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} />
    </>
  );
};

export default Header;
