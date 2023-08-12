import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { ApplyFlow, Community } from "../components";
import { STEPS } from "../components/AppyFlow/config";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../config";
import { useCommunityBalanceOf } from "../generated";
import { useAccountCommunityApplication } from "../hooks";

function ApplyToCommunityPage() {
  const { community } = useParams();

  const contractAddress: `0x${string}` =
    (community as `0x${string}`) || CONTRACTS.COMMUNITY[DEFAULT_CHAIN_ID];

  console.log("contractAddress", contractAddress);

  const { address } = useAccount();
  const { data: balanceOfAddress, isFetched: isBalanceFetched } =
    useCommunityBalanceOf({
      chainId: DEFAULT_CHAIN_ID,
      address: contractAddress,
      args: [address!],
      enabled: !!address,
    });
  const { data: application, isFetched } =
    useAccountCommunityApplication(contractAddress);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  const isAlreadyApplied = !!application;
  const isAlreadyMember = !!balanceOfAddress;

  console.log("balanceOfAddress", balanceOfAddress);

  if (!isBalanceFetched) {
    return <div>Loading...</div>;
  }

  if (isAlreadyMember) {
    return <Community />;
  }

  return (
    <ApplyFlow
      contractAddress={contractAddress}
      defaultStep={isAlreadyApplied ? STEPS.RequestToJoin : STEPS.Apply}
    />
  );
}

export { ApplyToCommunityPage };
