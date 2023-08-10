import { PropsWithChildren } from "react";

import downImageSrc from "./assets/down.svg";

function Select({
  children,
  ...otherProps
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      disabled
      className="flex items-center gap-2 rounded-[14px] bg-[#1A1B1F] p-2 text-white shadow-buttonShadow hover:opacity-90 disabled:opacity-60"
      {...otherProps}
    >
      <div>{children}</div>
      <div>
        <img src={downImageSrc} />
      </div>
    </button>
  );
}

export { Select };
