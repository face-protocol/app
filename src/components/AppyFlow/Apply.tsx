import { TCommunityVerificationApps } from "../../models";
import { useApplicationState } from "../../store";
import { Heading } from "../../ui";
import { TFlowProps } from "./types";

function Apply(props: TFlowProps) {
  const { title, requestToApply } = props.community;

  const {
    state,
    actions: { addApplication },
  } = useApplicationState();

  const communityActions: {
    [key in TCommunityVerificationApps]: () => any;
  } = {
    Wallet: () => {
      return {
        address: "0xefb8011ad92f29f8cd2fb2a7a1842b2c80e0de91",
        ens: "nrjshka.eth",
      };
    },
    WorldID: () => {
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
      <Heading.H1>To apply to {title} community, you need:</Heading.H1>
      <div className="flex flex-col gap-3">
        {requestToApply.map((id) => (
          <div key={id} className="flex justify-between">
            <p className="flex gap-2">
              <div></div>
              <div className="font-medium">{id}</div>
            </p>
            <div className="font-medium text-attention">
              {state[id] ? (
                "connected"
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
    </>
  );
}

export { Apply };
