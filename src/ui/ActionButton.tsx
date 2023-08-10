import { PropsWithChildren } from "react";

function ActionButton({
  children,
  ...otherProps
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className="font-medium text-attention hover:opacity-80"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export { ActionButton };
