import { PropsWithChildren } from "react";
import cx from "classnames";

function Button({
  children,
  className,
  ...otherProps
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cx(
        "h-14 w-full rounded-[20px] bg-buttonGradient font-semibold text-white/80 transition-all hover:opacity-90 active:opacity-70 disabled:opacity-40",
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export { Button };
