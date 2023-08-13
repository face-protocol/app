import { create } from "zustand";
import { TCommunityVerificationApps } from "../../models";
import { TStateValue, TUseApplicationState } from "./types";

const defaultState: Omit<TUseApplicationState, "actions"> = {
  isFinishedForm: false,
  state: {},
};

const useApplicationState = create<TUseApplicationState>((set, get) => ({
  ...defaultState,
  actions: {
    drop: () => {
      set((state) => ({
        state: {},
      }));
    },
    setFinishedForm: (isFinishedForm: boolean) => {
      set((state) => ({
        isFinishedForm,
      }));
    },
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
