import { COMMUNITY_MOCK } from "../../mocks";
import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";

function ApplyFlow() {
  const community = COMMUNITY_MOCK;
  const { state } = useApplicationState();

  const isCanContinue =
    Object.keys(state).length >= community.requestToApply.length;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-10 md:max-h-[400px]">
        <Apply community={community} />
      </div>

      <div>{isCanContinue && <Button>Continue</Button>}</div>
    </section>
  );
}

export { ApplyFlow };
