import { useDispatch, useSelector } from "react-redux";
import type { Action, Store } from "redux";
import type { ReadonlyDeep } from "type-fest";
import { isAction } from "./action";

export type State = Record<symbol, unknown>;

export type Reducer<T extends State = State> = (
  state: ReadonlyDeep<T>,
  action: ReadonlyDeep<Action>
) => ReadonlyDeep<T>;
export type StateExtender<T extends State> = (
  state: ReadonlyDeep<T>
) => ReadonlyDeep<T>;

const reducers: Reducer[] = [];
const stateExtenders: StateExtender<State>[] = [];

/**
 * Generates the initial state when the store is built.
 */
export const createState = (): State =>
  stateExtenders.reduce<State>((acc, extender) => extender(acc), {});

/**
 * Executes the registered reducers when the store is updated.
 * @param state The state to set when the reducer is run.
 * @param action The action being run against the state.
 */
export const reducer = (state: State, action: Action): State =>
  reducers.reduce((acc, r) => r(acc, action), state);

export interface AccessorOptions<
  TState extends State,
  TKey extends keyof TState,
  TValue extends ReadonlyDeep<TState[TKey]>
> {
  selector?: (value: TValue) => TValue;
  modifier?: (value: TValue) => TValue;
  replacer?: (newValue: TValue, oldValue: TValue) => TValue;
}

/**
 * Registers a handler that runs when the state is first created to set default values.
 * This inverts the dependencies so the store can be dynamically extended at compile-time.
 */
export const addState = <
  TState extends State,
  TKey extends keyof TState,
  TValue extends ReadonlyDeep<TState[TKey]>
>(
  key: TKey,
  initialize: (state: ReadonlyDeep<Partial<TState>>) => TValue,
  options: AccessorOptions<TState, TKey, TValue> = {}
): ((store?: Store<TState>) => [TValue, (val: TValue) => void]) => {
  const ident = <T>(value: T): T => value;
  const selector = options.selector ?? ident;
  const modifier = options.modifier ?? ident;
  const replacer = options.replacer ?? ident;

  // @ts-expect-error This happens because State is an empty object.
  stateExtenders.push((state) => ({ ...state, [key]: initialize(state) }));
  reducers.push((state, action) => {
    if (!isAction<TState, TKey>(action, key)) {
      return state;
    }

    const value = replacer(
      action.value as TValue,
      state[key as keyof typeof state] as TValue
    );

    return {
      ...state,
      [key]: value,
    };
  });

  return (store) => {
    const currentValue = (
      store ? store.getState()[key] : useSelector<TState>((state) => state[key])
    ) as TValue;
    const dispatch = store ? store.dispatch.bind(store) : useDispatch();
    return [
      selector(currentValue),
      (value) => {
        dispatch({ type: key, value: modifier(value) });
      },
    ];
  };
};
