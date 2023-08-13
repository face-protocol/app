import { useState } from "react";
import { DEFAULT_CHAIN_ID } from "../config";
import { useCommunityRulesUri } from "../generated";
import { TCommunityRules } from "../models";

function useFetchCommunityRules(
  chainId: number,
  contractAddress: `0x${string}`,
) {
  const [rulesData, setRulesData] = useState<TCommunityRules | null>(null);

  const { isFetched } = useCommunityRulesUri({
    chainId: DEFAULT_CHAIN_ID,
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
