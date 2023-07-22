import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Context } from "@/context";
import axios from "axios";
import Loader from "@/loader";

export default function Auth() {
  const { username, password, setUsername, setPassword } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

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
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="auth-container">
          <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
            <div className="auth-title">
              <Image
                alt="logo"
                src="/logo-no-background.png"
                width={60}
                height={40}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
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
      )}
    </div>
  );
}
