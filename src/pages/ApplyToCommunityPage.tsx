import { useAccount } from "wagmi";
import { ApplyFlow } from "../components";
import { STEPS } from "../components/AppyFlow/config";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../config";
import { useCommunityApplications } from "../generated";

function ApplyToCommunityPage() {
  const { address } = useAccount();
  const { data, isFetched } = useCommunityApplications({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.COMMUNITY[DEFAULT_CHAIN_ID],
    args: [address!],
  });

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
