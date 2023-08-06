import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";
import { GoogleLogin } from "@react-oauth/google";

export function App() {
  return (
    <main>
      <GoogleLogin onSuccess={() => alert("Success!")} />
    </main>
  );
}
