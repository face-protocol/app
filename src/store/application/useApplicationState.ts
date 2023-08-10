import { create } from "zustand";
import { TUseApplicationState } from "./types";

const defaultState: TUseApplicationState = {};

const useApplicationState = create<TUseApplicationState>(() => ({
  ...defaultState,
}));

export { useApplicationState };
