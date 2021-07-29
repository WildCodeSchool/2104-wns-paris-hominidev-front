import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

import "./styles/login.css";

type PopupProps = {
  handleSubmit: (e: any) => void;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      alert("bbb");
    }
  };
  return (
    <div data-testid="online" className="loginMain">
      <form>
        <label id="email" htmlFor="email">
          Email
          <br />
          <input
            value={email}
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label id="password" htmlFor="password">
          <br />
          Password
          <br />
          <input
            type="text"
            value={password}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleSubmit}
          />
        </label>
      </form>
      <p className="link"> mot de passe oublié </p>
    </div>
  );
};
export default Login;
