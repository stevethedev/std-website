import { EventRegistry } from "./event-registry";
import type { EventHandle, EventListener, EventType } from "./event-type";

export class EventBus {
  private readonly _registry: EventRegistry;

  constructor() {
    this._registry = new EventRegistry();
  }

  on<T extends unknown[]>(
    event: EventType,
    listener: EventListener<T>
  ): EventHandle {
    const wrapper = (...args: T) => listener(...args);
    this._registry.addListener(event, wrapper);

    const remove = () => this._registry.removeListener(event, wrapper);

    return { remove };
  }

  dispatch<T extends unknown[]>(event: EventType, ...args: T): void {
    this._registry.lookup(event).forEach((listener) => {
      listener(...args);
    });
  }
}
