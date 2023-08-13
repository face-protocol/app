import { useState } from "react";
import { COMMUNITY_MOCK } from "../../mocks/mocks";
import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";
import { STEPS } from "./config";
import { Deposit } from "./Deposit";
import { RequestToJoin } from "./RequestToJoin";
import { TFlowProps } from "./types";

import {
  useCommunityApplyForMembership,
  useCommunityMembershipDeposit,
} from "../../generated";
import { CONTRACTS, DEFAULT_CHAIN_ID, optimismGoerli } from "../../config";
import { useAccount, useConnect, useWaitForTransaction } from "wagmi";
import { TIpfsFile, uploadToIpfs, uploadUserData } from "../../ipfs";

function Steps({
  currentStep,
  props,
}: {
  currentStep: number;
  props: TFlowProps;
}) {
  switch (currentStep) {
    case STEPS.Apply: {
      return <Apply {...props} />;
    }
    case STEPS.Deposit: {
      return <Deposit {...props} />;
    }
    case STEPS.RequestToJoin: {
      return <RequestToJoin {...props} />;
    }
    default: {
      return null;
    }
  }
}

function NextStepButton({
  currentStep,
  onClick,
  isLoading,
}: {
  currentStep: number;
  onClick: VoidFunction;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Button disabled>Loading...</Button>;
  }

  switch (currentStep) {
    case STEPS.Apply: {
      return <Button onClick={onClick}>Continue</Button>;
    }
    case STEPS.Deposit: {
      return <Button onClick={onClick}>Send application</Button>;
    }
    default: {
      return null;
    }
  }
}

type TApplyFlowProps = {
  contractAddress: `0x${string}`;
  defaultStep?: number;
};

function ApplyFlow({
  defaultStep = STEPS.Apply,
  contractAddress,
}: TApplyFlowProps) {
  const community = COMMUNITY_MOCK;

  const { state } = useApplicationState();

  const { address } = useAccount();
  const { data: membershipDeposit = 0n } = useCommunityMembershipDeposit({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
  });

  const { write, data, isLoading } = useCommunityApplyForMembership({
    chainId: DEFAULT_CHAIN_ID,
    address: contractAddress,
    account: address,
    functionName: "applyForMembership",
    value: membershipDeposit,
  });

  useWaitForTransaction({
    hash: data?.hash,
    chainId: DEFAULT_CHAIN_ID,
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
  });

  const [currentStep, setCurrentStep] = useState(defaultStep);

  const onClickContinue = async () => {
    switch (currentStep) {
      case STEPS.Deposit: {
        const path = await uploadUserData(
          {
            address: address!,
            name: "John",
            avatarSrc:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cosmopolitan.com%2Fentertainment%2Fmovies%2Fa42734768%2Fhow-to-watch-avatar-2-way-of-water-streaming%2F&psig=AOvVaw2RIpImeBSGmbsl3Ujvnssr&ust=1692019649657000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPCh9cPe2YADFQAAAAAdAAAAABAJ",
          },
          contractAddress,
          address!,
        );

        await write({
          args: [path],
        });

        break;
      }
      case STEPS.Apply:
      default: {
        setCurrentStep((prev) => prev + 1);
        break;
      }
    }
  };

  const isFlowAvailable =
    Object.keys(state).length >= community.requestToApply.length;

  const isButtonAvailable =
    [STEPS.Apply, STEPS.Deposit].includes(currentStep) &&
    isFlowAvailable &&
    address;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-2 md:max-h-[400px]">
        <Steps
          currentStep={currentStep}
          props={{ community, membershipDeposit, contractAddress }}
        />
      </div>

      {isButtonAvailable && (
        <NextStepButton
          isLoading={isLoading}
          currentStep={currentStep}
          onClick={onClickContinue}
        />
      )}
    </section>
  );
}

export { ApplyFlow };
