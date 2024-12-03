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
  console.log(matches);

  const isBlogActive = matches.some((match) => match.pathname === "/blooog");
  console.log(isBlogActive);

  return (
    <Navbar className="sticky top-0 bg-primary-50">
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
          {isAuthed && (
            <Button variant="solid" color="primary" as={Link} href="/logout">
              Logout
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
