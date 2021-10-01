import { EventBus } from "../backbone/event-bus";
import { createContext } from "../component/Context";
import { createUseEventDispatchHook } from "./useEventDispatch";
import { renderHook } from "@testing-library/react-hooks";

it("allows events to be dispatched", () => {
  const eventBus = new EventBus();
  const useEventDispatch = createUseEventDispatchHook(
    createContext({ eventBus })
  );

  const event = Symbol("foo");
  const listener = jest.fn();
  eventBus.on(event, listener);

  const { result } = renderHook(useEventDispatch);
  result.current(event, "Hello", "world");

  expect(listener).toHaveBeenCalledWith("Hello", "world");
});
