import {
  createUseEventBusHook,
  useEventBus as useDefaultEventBus,
} from "./useEventBus";
import type { EventBus } from "../backbone/event-bus";
import { EventBusContext } from "../component/Context";

export const createUseEventDispatchHook = (
  context = EventBusContext
): (() => EventBus["dispatch"]) => {
  const useEventBus =
    context === EventBusContext
      ? useDefaultEventBus
      : createUseEventBusHook(context);

  return () => {
    const eventBus = useEventBus();
    return eventBus.dispatch.bind(eventBus);
  };
};

export const useEventDispatch = createUseEventDispatchHook();
