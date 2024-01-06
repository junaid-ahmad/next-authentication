import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./signin-button";
import Link from "next/link";

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className="px-4 py-2 rounded-md hover:bg-sky-500 transition-colors"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
