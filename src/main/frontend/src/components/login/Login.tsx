import React, { useState } from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  const [userInfo, setUserInfo] = useState(false);

  return (
    <>
      {!userInfo ? (
        <LoginForm userInfo={userInfo} setUserInfo={setUserInfo} />
      ) : (
        <>
          <LoginForm userInfo={userInfo} setUserInfo={setUserInfo} />
          <div className="d-flex justify-content-center mt-1 mb-2">
            <div style={{ width: "20rem" }}>
              Username or password is incorrect. <br /> Please Check your entry again.
            </div>
          </div>
        </>
      )}
    </>
  );
}
