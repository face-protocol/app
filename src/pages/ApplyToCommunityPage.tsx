import { useAccount } from "wagmi";
import { ApplyFlow } from "../components";
import { STEPS } from "../components/AppyFlow/config";
import { useAccountCommunityApplication } from "../hooks";

function ApplyToCommunityPage() {
  const { data, isFetched, address } = useAccountCommunityApplication();

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  const isAlreadyApplied = !!data;

  return (
    <ApplyFlow
      defaultStep={isAlreadyApplied ? STEPS.RequestToJoin : STEPS.Apply}
    />
  );
}

export { ApplyToCommunityPage };
