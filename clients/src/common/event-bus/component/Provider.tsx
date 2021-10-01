import React, { useMemo } from "react";
import type { EventBus } from "../backbone/event-bus";
import type { EventBusContextValue } from "./Context";
import { EventBusContext } from "./Context";

export interface ProviderProperties {
  eventBus: EventBus;
  context?: React.Context<EventBusContextValue | null>;
}

export const Provider: React.FC<ProviderProperties> = ({
  eventBus,
  children,
  context,
}) => {
  const contextValue = useMemo(() => ({ eventBus }), [eventBus]);
  const Context = context || EventBusContext;

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
