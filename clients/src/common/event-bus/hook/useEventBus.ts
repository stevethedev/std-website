import { useContext } from "react";
import { EventBusContext } from "../component/Context";
import { useEventBusContext as useDefaultEventBusContext } from "./useEventBusContext";
import type { EventBus } from "../backbone/event-bus";

export const createUseEventBusHook = (
  context = EventBusContext
): (() => EventBus) => {
  const useEventBusContext =
    context === EventBusContext
      ? useDefaultEventBusContext
      : () => useContext(context);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return () => useEventBusContext()!.eventBus;
};

export const useEventBus = createUseEventBusHook();
