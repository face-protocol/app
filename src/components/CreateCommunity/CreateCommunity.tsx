import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../../config";
import {
  useCommunityFactoryCreateCommunity,
  useCommunityFactoryNewCommunityEvent,
} from "../../generated";
import cx from "classnames";
import { COMMUNITY_VERIFICATION_APPS, TCommunityRules } from "../../models";
import { Button, Heading } from "../../ui";
import { TIpfsFile, uploadToIpfs } from "../../ipfs";

function CreateCommunity() {
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [selectArr, setSelectArr] = useState<boolean[]>([]);

  const { address } = useAccount();
  const { write, isLoading } = useCommunityFactoryCreateCommunity({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.FACTORY[DEFAULT_CHAIN_ID],
    value: 0n,
  });

  useCommunityFactoryNewCommunityEvent({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.FACTORY[DEFAULT_CHAIN_ID],
    listener: (event) => {
      const { community } = event[0].args;

      navigate(`/community/${community}`);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      communityName: { value: string };
      communityLogo: { value: string };
      communitySymbol: { value: string };
      depositAmount: { value: string };
      membersToAccept: { value: number };
    };

    const avatarSrc = target.communityLogo.value;
    const rules: TCommunityRules = {
      communityAvatarURL: avatarSrc,
    };

    const pathNameHash = btoa(
      `${JSON.stringify(rules)}${new Date().toDateString()}`,
    );
    const dataToUpload: TIpfsFile[] = [
      {
        path: `${pathNameHash}.json`,
        content: rules,
      },
    ];
    const rulesResponse = await uploadToIpfs(dataToUpload);
    const rulesURI = rulesResponse.result[0].path;

    const depositEth = parseEther(target.depositAmount.value);

    await write({
      value: depositEth,
      args: [
        {
          name: target.communityName.value,
          symbol: target.communitySymbol.value,
          rulesURI,
          membershipDeposit: depositEth,
          membershipVotesThreshold: BigInt(target.membersToAccept.value),
          votingDuration: 100n,
          initialMembers: [address!],
        },
      ],
    });

    setIsCreating(true);
  };

  return (
    <>
      <Heading.H1>Create a community</Heading.H1>
      <form className="mt-10" onSubmit={handleFormSubmit}>
        <div>Community name</div>
        <div className="mt-2">
          <input
            name="communityName"
            className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
            placeholder="YC Alumni"
            required
          />
        </div>

        <div className="mt-4">Community symbol</div>
        <div className="mt-2">
          <input
            name="communitySymbol"
            className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
            placeholder="YC"
            required
          />
        </div>

        <div className="mt-6 font-semibold">Community rules</div>

        <div className="mt-3">
          <div>Deposit amount</div>
          <div className="mt-2">
            <input
              name="depositAmount"
              required
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="0.01 ETH"
            />
          </div>
        </div>

        <div className="mt-6">
          <div>How many people should accept a new member?</div>
          <div className="mt-2">
            <input
              name="membersToAccept"
              required
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="3"
              defaultValue={3}
            />
          </div>
        </div>

        <div className="mt-6">
          <div>Link to the community logo</div>
          <div className="mt-2">
            <input
              name="communityLogo"
              required
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="https://..."
              type="string"
            />
          </div>
        </div>

        <div className="mt-6">
          <div>
            What data should an application to join a community include? <br />
            (Choose at least two)
          </div>
          <div className="mt-2">
            {COMMUNITY_VERIFICATION_APPS.map((id, i) => (
              <div key={id} className="flex justify-between">
                <p className="flex gap-2">
                  <div></div>
                  <div className="font-medium">{id}</div>
                </p>
                <div
                  className={cx(
                    "font-medium",
                    selectArr[i] ? "text-red-600" : "text-attention",
                  )}
                >
                  <button
                    className="hover:opacity-80"
                    onClick={() =>
                      setSelectArr((arr) => {
                        const newArr = [...arr];
                        newArr[i] = !newArr[i];
                        return newArr;
                      })
                    }
                  >
                    {selectArr[i] ? "remove" : "add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="mt-4"
          disabled={isLoading || isCreating}
        >
          {isLoading
            ? "Sign transaction"
            : isCreating
            ? "Creating..."
            : "Create"}
        </Button>
      </form>
    </>
  );
}

export { CreateCommunity };
