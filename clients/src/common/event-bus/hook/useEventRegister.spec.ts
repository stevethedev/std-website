import { EventBus } from "../backbone/event-bus";
import { createContext } from "../component/Context";
import { createEventRegisterHook } from "./useEventRegister";
import { renderHook } from "@testing-library/react-hooks";

it("registers events with the event-listener", () => {
  const eventBus = new EventBus();
  const useEventRegister = createEventRegisterHook(createContext({ eventBus }));

  const event = Symbol("foo");
  const listener = jest.fn();

  const { result } = renderHook(useEventRegister);
  result.current(event, listener);

  eventBus.dispatch(event, "Hello", "world");

  expect(listener).toHaveBeenCalledWith("Hello", "world");
});
