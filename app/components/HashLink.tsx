import { Link, useLocation } from "@remix-run/react";
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
        ref.current?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${id}`);
      }}
    >
      <Comp className="flex items-start gap-2 text-gray-400 hover:underline underline-offset-8 decoration-gray-600 hover:text-gray-300">
        # {children}
      </Comp>
    </Link>
  ) : (
    <>{children}</>
  );
}
