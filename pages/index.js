import React, { useContext } from "react";

import { useRouter } from "next/router";

import { Context } from "@/context";
import axios from "axios";

export default function Auth() {
  const { username, password, setUsername, setPassword } = useContext(Context);
  // 12ab3a9d-1dd6-4c47-9abf-27a481755052

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) return;

    axios
      .put(
        "https://api.chatengine.io/users/",

        { username, secret: password },
        { headers: { "Private-key": "12ab3a9d-1dd6-4c47-9abf-27a481755052" } }
      )

      .then((response) => {
        router.push("/chats");
      });
  };

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">DA Chat</div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="submit-button">
              Login / Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
