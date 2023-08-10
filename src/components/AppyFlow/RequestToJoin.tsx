import { USERS_MOCK } from "../../mocks/mocks";
import { Heading, Profile } from "../../ui";
import { ActionButton } from "../../ui/ActionButton";
import { TFlowProps } from "./types";

function RequestToJoin(props: TFlowProps) {
  const profiles = USERS_MOCK;
  return (
    <>
      <Heading.H1>
        Done! To be accepted, please ask your friend to approve your request.
      </Heading.H1>
      <div>
        You require approval from friends who collectively have a reputation of
        0.03 ETH
      </div>
      <div className="font-semibold text-attention">0 / 0.03 ETH</div>
      <div className="mt-10 flex items-center justify-between">
        <div>Copy the application link</div>
        <div>
          <ActionButton>copy</ActionButton>
        </div>
      </div>
      <div className="mt-auto">
        <div>List of some of your friends in the community</div>
        <div className="flex flex-col gap-3">
          {profiles.map((profile) => (
            <Profile
              profile={profile}
              type="friend"
              action={<ActionButton>open</ActionButton>}
              community={{
                title: "LinkedIn",
                src: "blob:https://www.figma.com/9e14c32a-fb80-4072-90ee-dacc18b19349",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export { RequestToJoin };
