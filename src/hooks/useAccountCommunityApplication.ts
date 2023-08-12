import { useAccount } from "wagmi";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../config";
import { useCommunityApplications } from "../generated";

function useAccountCommunityApplication() {
  const { address } = useAccount();
  const { data, isFetched } = useCommunityApplications({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.COMMUNITY[DEFAULT_CHAIN_ID],
    args: [address!],
  });

  return {
    data,
    isFetched,
    address,
  };
}

export { useAccountCommunityApplication };
