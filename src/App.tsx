import { ApplyToCommunityPage, CommunityPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LendingPage } from "./pages/LendingPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ConnectWalletPages } from "./pages/ConnectWalletPages";
import { CreateCommunityPage } from "./pages/CreateCommunityPage";
import { useEffect } from "react";
import Moralis from "moralis";

const router = createBrowserRouter([
  {
    path: "/lending",
    element: <LendingPage />,
  },
  {
    path: "*",
    element: <CreateCommunityPage />,
  },
  {
    path: "/community/:community",
    element: <ApplyToCommunityPage />,
  },
]);

export function App() {
  const { isConnected, isConnecting } = useAccount();

  useEffect(() => {
    Moralis.start({
      apiKey: import.meta.env.VITE_STORAGE_API_KEY,
    });
  }, []);

  return (
    <>
      <header className="flex h-[56px] w-full items-center justify-center p-2">
        {isConnected && <ConnectButton chainStatus="icon" />}
      </header>
      <main className="m-auto mt-3 h-full w-full max-w-[480px] p-4 pb-10 md:mt-[50px] md:pt-0">
        {!isConnecting && (
          <>
            {isConnected ? (
              <RouterProvider router={router} />
            ) : (
              <ConnectWalletPages />
            )}
          </>
        )}
      </main>
    </>
  );
}
