import { PropsWithChildren } from "react";

function Button({
  children,
  ...otherProps
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className="h-14 w-full rounded-[20px] bg-buttonGradient font-semibold text-white/80 transition-all hover:opacity-90 active:opacity-70"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export { Button };
