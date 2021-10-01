import {
  createUseEventBusHook,
  useEventBus as useDefaultEventBus,
} from "./useEventBus";
import type { EventBus } from "../backbone/event-bus";
import { EventBusContext } from "../component/Context";

export const createEventRegisterHook = (
  context = EventBusContext
): (() => EventBus["on"]) => {
  const useEventBus =
    context === EventBusContext
      ? useDefaultEventBus
      : createUseEventBusHook(context);

  return () => {
    const eventBus = useEventBus();
    return eventBus.on.bind(eventBus);
  };
};

export const useEventRegister = createEventRegisterHook();
