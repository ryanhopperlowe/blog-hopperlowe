import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useMatches } from "@remix-run/react";

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

      <NavbarContent justify="center">
        <NavbarItem isActive={isBlogActive}>
          <Link
            href="/blog"
            color="foreground"
            underline={isBlogActive ? "always" : "hover"}
          >
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>

      {isAuthed && (
        <NavbarContent justify="end">
          <>
            <NavbarItem>
              <Button variant="solid" color="primary" as={Link} href="/logout">
                Logout
              </Button>
            </NavbarItem>
          </>
        </NavbarContent>
      )}
    </Navbar>
  );
}
