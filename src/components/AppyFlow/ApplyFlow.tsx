import { useState } from "react";
import { COMMUNITY_MOCK } from "../../mocks";
import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";
import { STEPS } from "./config";
import { TFlowProps } from "./types";

function Steps({
  currentStep,
  props,
}: {
  currentStep: number;
  props: TFlowProps;
}) {
  switch (currentStep) {
    case STEPS.Apply:
    default: {
      return <Apply {...props} />;
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

  const isCanContinue =
    Object.keys(state).length >= community.requestToApply.length;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-10 md:max-h-[400px]">
        <Steps currentStep={currentStep} props={{ community }} />
      </div>

      <div>
        {isCanContinue && <Button onClick={onClickContinue}>Continue</Button>}
      </div>
    </section>
  );
}

export { ApplyFlow };
