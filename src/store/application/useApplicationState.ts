import { create } from "zustand";
import { TCommunityVerificationApps } from "../../models";
import { TStateValue, TUseApplicationState } from "./types";

const defaultState: Omit<TUseApplicationState, "actions"> = {
  state: {},
};

const useApplicationState = create<TUseApplicationState>((set, get) => ({
  ...defaultState,
  actions: {
    addApplication: (
      id: TCommunityVerificationApps,
      application: TStateValue,
    ) => {
      set((state) => ({
        state: {
          ...state.state,
          [id]: application,
        },
      }));
    },
  },
}));

export { useApplicationState };
