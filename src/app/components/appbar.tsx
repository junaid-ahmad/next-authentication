import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import SigninButton from "./signin-button";

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
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
