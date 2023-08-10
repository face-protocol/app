import { COMMUNITY_MOCK } from "../../mocks";
import { Heading } from "../../ui";
import { TFlowProps } from "./types";

function Apply(props: TFlowProps) {
  const { title, requestToApply } = props.community;

  return (
    <>
      <Heading.H1>To apply to {title} community, you need:</Heading.H1>
      <div className="flex flex-col gap-3">
        {requestToApply.map((item) => (
          <div key={item} className="flex justify-between">
            <p className="flex gap-2">
              <div></div>
              <div className="font-medium">{item}</div>
            </p>
            <div className="font-medium text-attention">
              <button>connect</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export { Apply };
