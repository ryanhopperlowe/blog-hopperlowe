import { Link, useLocation, useNavigate } from "@remix-run/react";
import { Element } from "node_modules/react-markdown/lib";
import { ReactNode, useEffect, useRef } from "react";

type HashLinkProps = {
  node?: Element;
  children: ReactNode;
  as: keyof React.JSX.IntrinsicElements;
};

export function HashLink({ node, children, as: Comp }: HashLinkProps) {
  const { hash } = useLocation();
  const ref = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  const id = node?.children[0]?.type === "text" ? node.children[0].value : "";

  useEffect(() => {
    if (decodeURIComponent(hash) === "#" + id) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [id, hash]);

  return id ? (
    <Link
      id={id}
      to={`#${id}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();

        if (Comp === "h1") {
          navigate({ hash: "" }, { replace: true });
          return;
        }

        ref.current?.scrollIntoView({ behavior: "smooth" });

        history.pushState(null, "", `#${id}`);
      }}
    >
      <Comp className="flex items-start gap-2 text-foreground-700 hover:underline underline-offset-8 decoration-foreground-400">
        {Comp !== "h1" && "#"} {children}
      </Comp>
    </Link>
  ) : (
    <>{children}</>
  );
}
