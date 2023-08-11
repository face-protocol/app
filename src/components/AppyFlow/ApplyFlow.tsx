import { useEffect, useState } from "react";
import { COMMUNITY_MOCK } from "../../mocks/mocks";
import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";
import { STEPS } from "./config";
import { Deposit } from "./Deposit";
import { RequestToJoin } from "./RequestToJoin";
import { TFlowProps } from "./types";

import { useCommunityApplyForMembership } from "../../generated";
import { HELIA_JSON } from "../../ipfs";
import { CONTRACTS, DEFAULT_CHAIN_ID, optimismGoerli } from "../../config";
import { useAccount, useWaitForTransaction } from "wagmi";

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

function ApplyFlow() {
  const community = COMMUNITY_MOCK;

  const { state } = useApplicationState();

  const { address } = useAccount();
  const { write, data, isLoading } = useCommunityApplyForMembership({
    chainId: DEFAULT_CHAIN_ID,
    address: CONTRACTS.COMMUNITY[DEFAULT_CHAIN_ID],
    value: 0n,
  });
  useWaitForTransaction({
    hash: data?.hash,
    chainId: DEFAULT_CHAIN_ID,
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
  });

  const [currentStep, setCurrentStep] = useState(STEPS.Apply);

  const onClickContinue = async () => {
    switch (currentStep) {
      case STEPS.Deposit: {
        // const hash = await HELIA_JSON.add({
        //   test: 123,
        // });
        // console.log("hash", hash.toString());
        // console.log(await HELIA_JSON.get(hash));
        // debugger;
        const hash = "12346";
        await write({
          args: [hash],
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
    [STEPS.Apply, STEPS.Deposit].includes(currentStep) && isFlowAvailable;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-2 md:max-h-[400px]">
        <Steps currentStep={currentStep} props={{ community }} />
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
