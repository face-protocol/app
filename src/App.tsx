import { ApplyToCommunityPage, CommunityPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LendingPage } from "./pages/LendingPage";

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
    <main className="m-auto mt-5 h-full w-full max-w-[480px] p-4 md:mt-[160px] md:pt-0">
      <RouterProvider router={router} />
    </main>
  );
}
