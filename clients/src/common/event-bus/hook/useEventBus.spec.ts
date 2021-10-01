import { EventBus } from "../backbone/event-bus";
import { createUseEventBusHook } from "./useEventBus";
import { createContext } from "../component/Context";
import { renderHook } from "@testing-library/react-hooks";

it("returns the event-bus", () => {
  const eventBus = new EventBus();
  const useEventBus = createUseEventBusHook(createContext({ eventBus }));
  const { result } = renderHook(useEventBus);
  expect(result.current).toEqual(eventBus);
});
