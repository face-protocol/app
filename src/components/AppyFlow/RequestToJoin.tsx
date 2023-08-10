import { Heading } from "../../ui";
import { TFlowProps } from "./types";

function RequestToJoin(props: TFlowProps) {
  return (
    <>
      <Heading.H1>
        Done! To be accepted, please ask your friend to approve your request.
      </Heading.H1>
      <div>
        You require approval from friends who collectively have a reputation of
        0.03 ETH
      </div>
      <div>0 / 0.03 ETH</div>
      <div className="flex items-center justify-between">
        <div>Copy the application link</div>
        <div>
          <button className="font-medium text-attention hover:opacity-80">
            copy
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <div>List of some of your friends in the community</div>
        <div></div>
      </div>
    </>
  );
}

export { RequestToJoin };
