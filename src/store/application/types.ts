import { TCommunityVerificationApps } from "../../models";

type TStateValue = any | null;

type TApplicationState = {
  [key in TCommunityVerificationApps]?: TStateValue;
};

type TUseApplicationState = {
  isFinishedForm: boolean;
  state: TApplicationState;
  actions: {
    drop: VoidFunction;
    setFinishedForm: (isFinishedForm: boolean) => void;
    addApplication: (
      id: TCommunityVerificationApps,
      application: TStateValue,
    ) => void;
  };
};

export type { TStateValue, TApplicationState, TUseApplicationState };
