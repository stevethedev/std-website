import type { EventBus } from "../backbone/event-bus";
import React from "react";

export interface EventBusContextValue {
  eventBus: EventBus;
}

export const createContext = (
  value: EventBusContextValue | null = null
): React.Context<EventBusContextValue | null> => React.createContext(value);

export const EventBusContext = createContext(null);
