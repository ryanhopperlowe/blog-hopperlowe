import { Link } from "@remix-run/react";
import { Element } from "node_modules/react-markdown/lib";
import { ReactNode } from "react";

type HashLinkProps = {
  node?: Element;
  children: ReactNode;
  as: keyof React.JSX.IntrinsicElements;
};

export function HashLink({ node, children, as: Comp }: HashLinkProps) {
  const id = node?.children[0]?.type === "text" ? node.children[0].value : "";

  return id ? (
    <Link id={id} to={`#${id}`} className="group">
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
