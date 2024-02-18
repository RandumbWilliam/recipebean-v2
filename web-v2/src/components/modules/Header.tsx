"use client";

import { twTheme } from "@/lib/twConfig";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../elements/Button";
import Logo from "../elements/Logo";
import { IconMenu, IconX } from "../icons";

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
    <>
      <header className="fixed w-full py-2 md:py-4 bg-white z-50">
        <div className="wrapper flex items-center justify-between">
          <Link href="/">
            <Logo className="h-8 md:h-12" />
          </Link>
          <div className="hidden md:flex justify-end gap-3">
            <Link
              href="/signin"
              className={buttonVariants({ variant: "secondary" })}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: "primary" })}
            >
              Sign Up
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNav}>
              {isOpen ? (
                <IconX className="h-8 w-8 text-brink-pink-500" />
              ) : (
                <IconMenu className="h-8 w-8 text-brink-pink-500" />
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
