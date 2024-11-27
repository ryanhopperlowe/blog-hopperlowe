import { ComponentProps } from "react";
import { cn } from "~/lib/utils/className";

export function Button({
  children,
  loading,
  startContent,
  endContent,
  ...props
}: ComponentProps<"button"> & {
  loading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}) {
  return (
    <button {...props} className={cn("btn btn-primary", props.className)}>
      <div className="flex items-center gap-2">
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          startContent
        )}

        {children}
        {endContent}
      </div>
    </button>
  );
}
