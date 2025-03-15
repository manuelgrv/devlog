import clsx from "clsx";
import { ReactNode, ReactElement } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | string[];
}): ReactElement {
  return (
    <div
      className={clsx(
        "container",
        "mx-auto",
        "max-w-sm",
        "sm:max-w-xl",
        "flex",
        "flex-nowrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
