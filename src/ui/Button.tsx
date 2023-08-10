import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return (
    <button className="h-14 w-full rounded-[20px] bg-buttonGradient font-semibold text-white/80">
      {children}
    </button>
  );
}

export { Button };
