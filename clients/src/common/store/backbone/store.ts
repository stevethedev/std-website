import type { Action, Store as BaseStore } from "redux";
import { createStore as createStoreBase } from "redux";
import type { State } from "./state";
import { createState, reducer } from "./state";

export type Store = BaseStore<State>;

export const createStore = (): Store =>
  createStoreBase((state: State | undefined, action: Action) =>
    reducer(state ?? createState(), action)
  );
