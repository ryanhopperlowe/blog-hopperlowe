import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useMatches, Link as RemixLink } from "@remix-run/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Header({ isAuthed }: { isAuthed: boolean }) {
  const matches = useMatches();
  const isBlogActive = matches.some((match) => match.pathname === "/blog");

  return (
    <Navbar
      className="bg-primary-50 justify-between"
      classNames={{
        wrapper: "max-w-full",
      }}
    >
      <NavbarBrand>
        <Link href="/" color="foreground">
          Ryan Hopper-Lowe
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem isActive={isBlogActive}>
          <Link
            href="/blog"
            color="foreground"
            underline={isBlogActive ? "always" : "hover"}
          >
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <RemixLink
            to="https://github.com/ryanhopperlowe"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={22} />
          </RemixLink>
        </NavbarItem>

        <NavbarItem>
          <RemixLink
            to="https://www.linkedin.com/in/ryan-hopper-lowe-33ba95135/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={22} />
          </RemixLink>
        </NavbarItem>

        {isAuthed && (
          <NavbarItem>
            <Button variant="solid" color="primary" as={Link} href="/logout">
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
