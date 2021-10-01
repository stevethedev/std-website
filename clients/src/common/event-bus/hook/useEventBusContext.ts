import { useContext } from "react";
import { EventBusContext } from "../component/Context";
import type { EventBusContextValue } from "../component/Context";

export const useEventBusContext = (): EventBusContextValue | null => {
  return useContext(EventBusContext);
};
