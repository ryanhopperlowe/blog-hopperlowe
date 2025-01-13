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
    <Link id={id} to={`#${id}`} replace ref={ref} className="group">
      <Comp className="flex items-center gap-2">
        {children}

        <span className="invisible text-content3-foreground group-hover:visible">
          #
        </span>
      </Comp>
    </Link>
  ) : (
    <>{children}</>
  );
}
