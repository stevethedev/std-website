import { addState } from "../backbone/state";

export type Token = string | null;
export const useToken = addState(Symbol("TOKEN"), (): Token => null);
