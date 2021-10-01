export type EventType = symbol | string | number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventListener<T extends any[]> = (...args: T) => void;
export interface EventHandle {
  remove: () => void;
}
