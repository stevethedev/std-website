import { Provider } from "./Provider";
import { renderHook } from "@testing-library/react-hooks";
import { EventBus } from "../backbone/event-bus";
import { createContext } from "./Context";

it("mounts and renders", () => {
  const eventBus = new EventBus();
  const context = createContext();
  const { result } = renderHook(Provider, {
    initialProps: { eventBus, context },
  });

  expect(result.error).toBeFalsy();
});
