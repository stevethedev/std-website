import { EventRegistry } from "./event-registry";

it("adds new listeners to the event list", () => {
  const reg = new EventRegistry();

  expect(reg.addListener("test", () => void 0)).toEqual(1);
  expect(reg.addListener("test", () => void 0)).toEqual(2);
  expect(reg.addListener("test", () => void 0)).toEqual(3);

  expect(reg.addListener("test1", () => void 0)).toEqual(1);
});

it("removes listeners from the event list", () => {
  const reg = new EventRegistry();

  const listeners = [jest.fn(), jest.fn(), jest.fn()];

  listeners.forEach((l) => reg.addListener("test", l));

  expect(reg.removeListener("test", listeners[0])).toEqual(2);
  expect(reg.removeListener("test", listeners[0])).toEqual(2);
  expect(reg.removeListener("test", listeners[2])).toEqual(1);
  expect(reg.removeListener("test", listeners[1])).toEqual(0);
});

it("retrieves listeners from the event list", () => {
  const reg = new EventRegistry();

  const listeners = [jest.fn(), jest.fn(), jest.fn()];

  listeners.forEach((l) => reg.addListener("test", l));

  expect(reg.lookup("test")).toEqual(listeners);
});
