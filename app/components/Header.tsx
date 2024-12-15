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
  const isCreateArticleActive = matches.some(
    (match) => match.pathname === "/articles/create"
  );

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

        {isAuthed && (
          <>
            <NavbarItem>
              <Link
                color="foreground"
                href="/articles/create"
                underline={isCreateArticleActive ? "always" : "hover"}
              >
                Create Article
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button variant="solid" color="primary" as={Link} href="/logout">
                Logout
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
