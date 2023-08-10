import { TCommunityVerificationApps } from "../../models";

type TApplicationState = {
  [key in TCommunityVerificationApps]?: any | null;
};

type TUseApplicationState = {
  state: TApplicationState;
};

export type { TApplicationState, TUseApplicationState };
