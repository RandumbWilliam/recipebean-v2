"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../elements/Button";
import Logo from "../elements/Logo";
import { IconMenu } from "../icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full py-4">
      <div className="wrapper flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden md:flex justify-end gap-3">
          <Button variant="secondary">Log In</Button>
          <Button>Sign Up</Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleNav}>
            <IconMenu size={40} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
