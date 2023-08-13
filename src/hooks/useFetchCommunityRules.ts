import { useState } from "react";
import { useNetwork } from "wagmi";
import { DEFAULT_CHAIN_ID } from "../config";
import { useCommunityRulesUri } from "../generated";
import { TCommunityRules } from "../models";

function useFetchCommunityRules(
  chainId: number,
  contractAddress: `0x${string}`,
) {
  const [rulesData, setRulesData] = useState<TCommunityRules | null>(null);
  const { chain } = useNetwork();

  const { isFetched } = useCommunityRulesUri({
    chainId: chain?.id!,
    address: contractAddress,
    onSuccess: async (url) => {
      const json = await fetch(url);
      const data = await json.json();

      setRulesData(data);
    },
  });

  return { rulesData, isFetched };
}

export { useFetchCommunityRules };
