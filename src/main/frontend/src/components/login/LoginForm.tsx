import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStoreContext } from "../Store";

interface Props {
  userInfo: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuthStoreContext();
  const { userInfo, setUserInfo } = props;

  // function check_cookie_name(name: string): string {
  //   const match = document.cookie.match(
  //     new RegExp("(^| )" + name + "=([^;]+)")
  //   );
  //   if (match) {
  //     return match[2];
  //   } else {
  //     return "--no cookie with this name---";
  //   }
  // }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bodyData = new FormData();
    bodyData.append("username", username);
    bodyData.append("password", password);

    axios
      .post("/perform_login", bodyData)
      .then((res) => {
        if (!res.request.responseURL.match("error$")) {
          dispatch({ type: "LOGGED_IN" });
          sessionStorage.setItem("loggedIn", "true")
          navigate("/profile");
        } else {
          setUserInfo(true);
          setUsername("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card mt-4 mb-2" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="username" className="form-label mt-2">
              {" "}
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="username"
              value={username}
              onFocus={() => setUserInfo(false)}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              required
            />
            <label htmlFor="unicornPassword" className="form-label mt-2">
              {" "}
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="unicornPassword"
              value={password}
              onChange={(e) => {
                userInfo && setUserInfo(false);
                setPassword(e.currentTarget.value);
              }}
              required
            />

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
