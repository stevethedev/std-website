import type { Action as BaseAction } from "redux";
import type { State } from "./state";

export interface Action<TState extends State, TKey extends keyof TState>
  extends BaseAction<TKey> {
  readonly value: TState[TKey];
}

/**
 * Determines whether the given action is the expected type.
 * @param a The action to check.
 * @param type The expected value of the type-property.
 */
export const isAction = <TState extends State, TKey extends keyof TState>(
  a: BaseAction,
  type: TKey
): a is Action<TState, TKey> => a.type === type;
