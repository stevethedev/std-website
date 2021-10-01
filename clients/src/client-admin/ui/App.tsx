import React from "react";
import ReactDOM from "react-dom";
import { createControllerInitializer } from "../../common/controller";
import { authentication } from "../../common/controller/authentication";
import { EventBus, EventBusProvider } from "../../common/event-bus";
import { StoreProvider, createStore } from "../../common/store";
import { LoginForm } from "./container/LoginForm";

export const App: React.FC = () => {
  const eventBus = new EventBus();
  const store = createStore();

  const ci = createControllerInitializer({ store, eventBus });
  ci(authentication);

  return (
    <StoreProvider store={store}>
      <EventBusProvider eventBus={eventBus}>
        <h1>Hello, world</h1>
        <LoginForm />
      </EventBusProvider>
    </StoreProvider>
  );
};

export const create = (container: HTMLElement): void => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
};
