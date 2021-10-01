import type { EventBus } from "../event-bus";
import type { Store } from "../store/backbone/store";

export interface ControllerOptions {
  store: Store;
  eventBus: EventBus;
}

export type Controller = (options: ControllerOptions) => void;
export type ControllerInitializer = (
  ...controllers: Controller[]
) => ControllerInitializer;

export const controller = (fn: Controller): Controller => fn;

export const createControllerInitializer = (
  options: ControllerOptions
): ControllerInitializer => {
  const initializer: ControllerInitializer = (...controllers) => {
    controllers.forEach((c) => c(options));
    return initializer;
  };

  return initializer;
};
