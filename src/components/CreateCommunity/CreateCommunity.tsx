import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEther } from "viem";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { CONTRACTS, DEFAULT_CHAIN_ID } from "../../config";
import {
  useCommunityFactoryCreateCommunity,
  useCommunityFactoryNewCommunityEvent,
} from "../../generated";
import cx from "classnames";
import {
  COMMUNITY_VERIFICATION_APPS,
  TCommunityRules,
  TCommunityVerificationApps,
} from "../../models";
import { Button, Heading } from "../../ui";
import { TIpfsFile, uploadToIpfs, uploadUserData } from "../../ipfs";
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { useApplicationState } from "../../store";

function CreateCommunity() {
  const navigate = useNavigate();

  const contractAddress = CONTRACTS.FACTORY[DEFAULT_CHAIN_ID];

  const {
    state,
    actions: { addApplication, drop },
  } = useApplicationState();

  const [isCreating, setIsCreating] = useState(false);
  const [selectArr, setSelectArr] = useState<boolean[]>([]);

  const { address } = useAccount();
  const { writeAsync, isLoading } = useCommunityFactoryCreateCommunity({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
    value: 0n,
  });

  useCommunityFactoryNewCommunityEvent({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
    listener: (event) => {
      const { community } = event[0].args;

      drop();
      navigate(`/community/${community}`);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!state["WorldID"]) {
        console.warn("Connect worldcoin id!");
        return;
      }

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
        countOfApprovals: target.membersToAccept.value,
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

      const userData = await uploadUserData(
        {
          address: address!,
          name: "Max",
          avatarSrc:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnordic.ign.com%2Favatar-generations&psig=AOvVaw2RIpImeBSGmbsl3Ujvnssr&ust=1692019649657000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPCh9cPe2YADFQAAAAAdAAAAABAD",
        },
        contractAddress,
        address!,
      );

      const initialMembersDatas = [userData];

      await writeAsync({
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
            initialMembersDatas,
          },
        ],
      });
      console.log("here");

      setIsCreating(true);
    } catch (error) {
      setIsCreating(false);
    }
  };

  console.log('tate["WorldID"]', state["WorldID"]);

  const { connect } = useConnect();

  const { data: ens } = useEnsName({
    address,
    chainId: 1,
  });

  const verifyProof = (data) => {
    addApplication("WorldID", data);
  };

  const communityActions: {
    [key in TCommunityVerificationApps]: () => any;
  } = {
    Wallet: async () => {
      await connect();
      return {
        address,
        ens,
      };
    },
    WorldID: () => {
      // setOpen(true);
      return {
        status: "verified",
      };
    },
    X: () => {
      return {
        account: "Max | nrjshka.eth",
      };
    },
  };

  const communityState: {
    [key in TCommunityVerificationApps]: string;
  } = {
    Wallet: state.Wallet?.ens || state.Wallet?.address || "connected",
    WorldID: "verified",
    X: "connected",
  };

  const onConnectClick = (id: TCommunityVerificationApps) => () => {
    const action = communityActions[id];

    try {
      const output = action();

      addApplication(id, output);
    } catch (error) {
      console.error(error);
    }
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
                  {id === "WorldID" ? (
                    <IDKitWidget
                      app_id={import.meta.env.VITE_WORLD_APP_ID}
                      action="login"
                      handleVerify={verifyProof}
                      credential_types={[CredentialType.Orb]}
                      onSuccess={() => {}}
                      autoClose
                    >
                      {({ open }) => (
                        <button onClick={open} className="hover:opacity-80">
                          {state[id] ? "verified" : "connect"}
                        </button>
                      )}
                    </IDKitWidget>
                  ) : state[id] ? (
                    communityState[id]
                  ) : (
                    <button
                      onClick={onConnectClick(id)}
                      className="hover:opacity-80"
                    >
                      connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="mt-4"
          disabled={isLoading || isCreating || !state["WorldID"]}
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
