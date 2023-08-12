import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Heading } from "../ui";

const ConnectWalletPages = () => {
  return (
    <div>
      <Heading.H1>Connect wallet to start using Face Protocol!</Heading.H1>
      <div className="mt-5">
        <ConnectButton chainStatus="icon" />
      </div>
    </div>
  );
};

export { ConnectWalletPages };
