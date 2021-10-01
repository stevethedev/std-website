import React, { useState } from "react";
import { useLoginEventDispatch } from "../../../common/event-bus/events/login";
import { useToken } from "../../../common/store/data/token";
import { InputText } from "../component/InputText";
import { InputButton } from "../component/InputButton";
import $style from "./LoginForm.module.css";

export const LoginForm: React.FC = () => {
  const [token] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginEventDispatch = useLoginEventDispatch();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    loginEventDispatch({ username, password });
    return false;
  };

  return (
    <section className={$style.loginForm}>
      Token: {token}
      <form onSubmit={submit} method="POST">
        <InputText label="Username" value={username} setValue={setUsername} />
        <InputText
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <InputButton label="Log me in" />
      </form>
    </section>
  );
};
