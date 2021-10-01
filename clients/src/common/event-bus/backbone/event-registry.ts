import type { EventListener, EventType } from "./event-type";

export class EventRegistry {
  private readonly _listeners: Map<EventType, EventListener[]>;

  constructor() {
    this._listeners = new Map();
  }

  addListener(event: EventType, listener: EventListener): number {
    return this.lookup(event).push(listener);
  }

  removeListener(event: EventType, listener: EventListener): number {
    const listeners = this.lookup(event);
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    return listeners.length;
  }

  lookup(event: EventType): EventListener[] {
    return this._listeners.get(event) ?? this.createListenerList(event);
  }

  private createListenerList(event: EventType): EventListener[] {
    const listeners: EventListener[] = [];
    this._listeners.set(event, listeners);
    return listeners;
  }
}
