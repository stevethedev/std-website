import { createEventHooks, useEventBus } from "../index";
import type { EventHandle } from "../backbone/event-type";

export interface LoginEventPayload {
  username: string;
  password: string;
}

export type LoginEventListener = (payload: LoginEventPayload) => void;
export type LoginEventDispatcher = (payload: LoginEventPayload) => void;
export type LoginEventRegister = (listener: LoginEventListener) => EventHandle;

const { register: registerLoginEvent, dispatch: dispatchLoginEvent } =
  createEventHooks<[LoginEventPayload]>(Symbol("login event"));

export { registerLoginEvent, dispatchLoginEvent };

export const useLoginEventDispatch = (
  eventBus = useEventBus()
): LoginEventDispatcher => dispatchLoginEvent.bind(null, eventBus);

export const useLoginEventRegister = (
  eventBus = useEventBus()
): LoginEventRegister => registerLoginEvent.bind(null, eventBus);
