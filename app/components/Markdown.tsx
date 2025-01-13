import ReactMarkdown, { type Components } from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";

import { ReactNode } from "react";
import { Prism as Highlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { HashLink } from "./HashLink";

type CodeProps = {
  className?: string;
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Code = ({ className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || "");

  return match && typeof children === "string" ? (
    <Highlighter PreTag="div" style={vscDarkPlus} language={match[1]}>
      {children}
    </Highlighter>
  ) : (
    <code
      className={
        className +
        " before:content-[''] after:content-[''] bg-foreground-200 p-1 rounded-md"
      }
      {...props}
    >
      {children}
    </code>
  );
};

export function Markdown({ children }: { children: string }) {
  const Components: Components = {
    code({ ...props }) {
      return <Code {...props} />;
    },
    h2({ children, node }) {
      return (
        <HashLink node={node} as="h2">
          {children}
        </HashLink>
      );
    },
    h3({ children, node }) {
      return (
        <HashLink node={node} as="h3">
          {children}
        </HashLink>
      );
    },
    h4({ children, node }) {
      return (
        <HashLink node={node} as="h4">
          {children}
        </HashLink>
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
      components={Components}
    >
      {children}
    </ReactMarkdown>
  );
}
