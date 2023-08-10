import { useState } from "react";
import { COMMUNITY_MOCK } from "../../mocks/mocks";
import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";
import { STEPS } from "./config";
import { Deposit } from "./Deposit";
import { RequestToJoin } from "./RequestToJoin";
import { TFlowProps } from "./types";

function Steps({
  currentStep,
  props,
}: {
  currentStep: number;
  props: TFlowProps;
}) {
  switch (currentStep) {
    case STEPS.Deposit: {
      return <Deposit {...props} />;
    }
    case STEPS.Apply: {
      return <Apply {...props} />;
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
}: {
  currentStep: number;
  onClick: VoidFunction;
}) {
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

  const [currentStep, setCurrentStep] = useState(STEPS.Apply);

  const onClickContinue = () => {
    setCurrentStep((prev) => prev + 1);
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
        <NextStepButton currentStep={currentStep} onClick={onClickContinue} />
      )}
    </section>
  );
}

export { ApplyFlow };
