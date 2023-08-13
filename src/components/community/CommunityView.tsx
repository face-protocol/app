import { useMemo, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useNetwork } from "wagmi";
import { DEFAULT_CHAIN_ID } from "../../config";
import {
  useCommunityApproveMembership,
  useCommunityBalanceOf,
  useCommunityReputationOf,
  useCommunityRulesUri,
} from "../../generated";
import { useFetchCommunityRules } from "../../hooks";
import { FULL_LIST, REQUEST_TO_JOIN, USERS_MOCK } from "../../mocks/mocks";
import { TCommunityRules } from "../../models";
import { useApplicationState } from "../../store";
import { Heading, Profile } from "../../ui";
import { ActionButton } from "../../ui/ActionButton";

import baseSrc from "../assets/base.png";

type TCommunityViewProps = {
  contractAddress: `0x${string}`;
};

const CommunityView = ({ contractAddress }: TCommunityViewProps) => {
  const {
    isFinishedForm,
    actions: { setFinishedForm },
  } = useApplicationState();

  const [communityMembers, setCommunityMembers] = useState(USERS_MOCK);
  const [requestToJoin, setRequestToJoin] = useState(REQUEST_TO_JOIN);

  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: reputationOf } = useCommunityReputationOf({
    chainId: chain?.id!,
    address: contractAddress,
    args: [address!],
    enabled: !!address,
  });

  const { rulesData, isFetched } = useFetchCommunityRules(
    chain?.id!,
    contractAddress,
  );

  const { writeAsync } = useCommunityApproveMembership({
    chainId: chain?.id!,
    address: contractAddress,
  });

  const onClick = async () => {
    await writeAsync({
      args: ["0x0430dc660dd72142fb6b3248e684c7444fe30723"],
    });

    setRequestToJoin([]);
    setCommunityMembers(FULL_LIST);
    setFinishedForm(false);
  };

  const userReputation =
    typeof reputationOf === "bigint" && formatEther(reputationOf || 0n);

  if (!isFetched || !rulesData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-2 md:max-h-[400px]">
        <Heading.H1>Stanford community</Heading.H1>

        <img src={rulesData.communityAvatarURL} className="mt-3 w-full" />

        <div className="mt-10 flex flex-col gap-1">
          <div className="flex gap-1 font-medium text-white">
            <div>Your reputation:</div>
            {userReputation && (
              <div className="text-attention">{userReputation} ETH</div>
            )}
          </div>

          <div className="flex gap-1 font-medium text-white">
            <div>Health rate:</div>
            <div className="text-attention">1.2</div>
            <button className="text-gray-500">manage it</button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="text-[#F5F5F5] ">FAQ</div>
          <div className="flex w-full items-center justify-between">
            <div>How can I improve my reputation?</div>
            <div>
              <ActionButton>read</ActionButton>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>How can I leverage my reputation?</div>
            <div>
              <ActionButton>read</ActionButton>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <header className="flex items-center justify-between ">
            <div className="font-semibold">Community members</div>
            <div className="text-gray-500 ">Boosts: 3/5</div>
          </header>
          <main className="flex flex-col gap-3">
            {communityMembers.map((member) => (
              <Profile
                type="member"
                profile={member}
                action={null}
                community={{ title: "Base", src: baseSrc }}
              />
            ))}
          </main>
        </section>

        {isFinishedForm && (
          <section className="my-10">
            <header className="flex items-center justify-between ">
              <div className="font-semibold">Requests to join community:</div>
              <div className="text-gray-500 ">Boosts: 3/5</div>
            </header>
            <main className="flex flex-col gap-3">
              {REQUEST_TO_JOIN.map((member) => (
                <Profile
                  type="member"
                  profile={member}
                  action={
                    <ActionButton onClick={onClick}>
                      Approve membership
                    </ActionButton>
                  }
                  community={{ title: "Base", src: baseSrc }}
                />
              ))}
            </main>
          </section>
        )}
      </div>
    </section>
  );
};

export { CommunityView };
