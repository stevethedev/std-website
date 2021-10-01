import type { EventBus } from "./backbone/event-bus";
import type {
  EventHandle,
  EventListener,
  EventType,
} from "./backbone/event-type";

export { EventBus } from "./backbone/event-bus";
export { Provider as EventBusProvider } from "./component/Provider";
export { useEventBus } from "./hook/useEventBus";
export { useEventDispatch } from "./hook/useEventDispatch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface EventHooks<T extends any[]> {
  register: (eventBus: EventBus, listener: EventListener<T>) => EventHandle;
  dispatch: (eventBus: EventBus, ...args: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEventHooks = <T extends any[]>(
  event: EventType
): EventHooks<T> => {
  return {
    register: (eventBus, listener) => eventBus.on(event, listener),
    dispatch: (eventBus, ...args) => eventBus.dispatch(event, ...args),
  };
};
