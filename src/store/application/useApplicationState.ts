import { create } from "zustand";
import { TCommunityVerificationApps } from "../../models";
import { TStateValue, TUseApplicationState } from "./types";

const defaultState: Omit<TUseApplicationState, "actions"> = {
  state: {},
};

const useApplicationState = create<TUseApplicationState>(() => ({
  ...defaultState,
  actions: {
    addApplication: (
      id: TCommunityVerificationApps,
      application: TStateValue,
    ) => {
      return {
        state: {
          [id]: application,
        },
      };
    },
  },
}));

export { useApplicationState };
