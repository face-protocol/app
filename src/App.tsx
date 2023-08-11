import { ApplyToCommunityPage, CommunityPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LendingPage } from "./pages/LendingPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const router = createBrowserRouter([
  {
    path: "/lending",
    element: <LendingPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "*",
    element: <ApplyToCommunityPage />,
  },
]);

export function App() {
  return (
    <>
      <header className="flex w-full items-center justify-center p-2">
        <ConnectButton chainStatus="icon" />
      </header>
      <main className="m-auto mt-3 h-full w-full max-w-[480px] p-4 md:mt-[160px] md:pt-0">
        <RouterProvider router={router} />
      </main>
    </>
  );
}
