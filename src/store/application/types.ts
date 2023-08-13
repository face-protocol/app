import { TCommunityVerificationApps } from "../../models";

type TStateValue = any | null;

type TApplicationState = {
  [key in TCommunityVerificationApps]?: TStateValue;
};

type TUseApplicationState = {
  state: TApplicationState;
  actions: {
    drop: VoidFunction;
    addApplication: (
      id: TCommunityVerificationApps,
      application: TStateValue,
    ) => void;
  };
};

export type { TStateValue, TApplicationState, TUseApplicationState };
