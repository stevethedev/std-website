import { useLoginEventRegister } from "../event-bus/events/login";
import { useToken } from "../store/data/token";
import { controller } from "./index";

export const authentication = controller(({ store, eventBus }) => {
  const onLogin = useLoginEventRegister(eventBus);
  const [, setToken] = useToken(store);

  onLogin(({ username, password }) => {
    setToken(`New Token: ${username}:${password}`);
  });
});
