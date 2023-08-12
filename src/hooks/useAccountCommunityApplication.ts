import { useAccount } from "wagmi";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../config";
import { useCommunityApplications } from "../generated";

function useAccountCommunityApplication(contractAddress: `0x${string}`) {
  const { address } = useAccount();
  const { data, isFetched } = useCommunityApplications({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
    args: [address!],
    enabled: !!address,
  });

  return {
    data,
    isFetched,
    address,
  };
}

export { useAccountCommunityApplication };
