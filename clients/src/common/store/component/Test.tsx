import React from "react";
import { createStore } from "../backbone/store";
import { StoreProvider } from "./Provider";

export const Test: React.FC = ({ children }): JSX.Element => (
  <StoreProvider store={createStore()}>{children}</StoreProvider>
);
