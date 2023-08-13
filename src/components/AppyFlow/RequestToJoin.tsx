import { USERS_MOCK } from "../../mocks/mocks";
import { Heading, Profile } from "../../ui";
import { ActionButton } from "../../ui/ActionButton";
import { TFlowProps } from "./types";

import linkedInSrc from "../assets/linkedin.png";
import {
  useAccountCommunityApplication,
  useFetchCommunityRules,
} from "../../hooks";
import { useAccount, useQuery as useReactQuery } from "wagmi";
import { useCommunityMembershipDeposit } from "../../generated";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../../config";
import { formatEther, parseEther } from "viem";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITY_USERS } from "../../graphql";
import { useFetchCommunityUsers } from "../../hooks/useFetchCommunityUsers";
import { fetchAllEvents } from "../../ipfs";

function RequestToJoin({ contractAddress }: TFlowProps) {
  const profiles = USERS_MOCK;
  const { data: membershipDeposit = 0n } = useCommunityMembershipDeposit({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
  });
  const { data } = useAccountCommunityApplication(contractAddress);
  const { rulesData } = useFetchCommunityRules(
    DEFAULT_CHAIN_ID,
    contractAddress,
  );

  const votesFor = data && Number(data[2]);
  const needReputation = formatEther(
    membershipDeposit * BigInt(rulesData?.countOfApprovals || 3),
  );

  useFetchCommunityUsers(contractAddress);
  const { queryData } = useReactQuery(
    ["fetch", "all", "events", contractAddress],
    () => {
      return fetchAllEvents(contractAddress, DEFAULT_CHAIN_ID);
    },
  );

  console.log("queryData", queryData);

  if (!rulesData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Heading.H1>
        Done! To be accepted, please ask your friend to approve your request.
      </Heading.H1>
      <img src={rulesData.communityAvatarURL} className="mt-3 w-full" />
      <div>
        You require approval from friends who collectively have a reputation of{" "}
        {needReputation} ETH
      </div>
      <div className="font-semibold text-attention">
        {votesFor} / {needReputation} ETH
      </div>
      <div className="mt-10 flex items-center justify-between">
        <div>Copy the application link</div>
        <div>
          <ActionButton>copy</ActionButton>
        </div>
      </div>
      <div className="mt-auto">
        <div>List of some of your friends in the community</div>
        <div className="flex flex-col gap-3 pt-6">
          {profiles.map((profile) => (
            <Profile
              profile={profile}
              type="friend"
              action={<ActionButton>open</ActionButton>}
              community={{
                title: "LinkedIn",
                src: linkedInSrc,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export { RequestToJoin };
