import { useAccount } from "wagmi";
import { ApplyFlow } from "../components";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../config";
import { useCommunityApplications } from "../generated";

function ApplyToCommunityPage() {
  const { address } = useAccount();
  const { data } = useCommunityApplications({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.COMMUNITY[DEFAULT_CHAIN_ID],
    args: [address!],
  });

  console.log("dsd", data);
  return <ApplyFlow />;
}

export { ApplyToCommunityPage };
