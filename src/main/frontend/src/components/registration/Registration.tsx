import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { Navigate } from "react-router-dom";

export default function Registration() {
  const [isSamePassword, setIsSamePassword] = useState<number | undefined>();
  return (
    <>
      {!isSamePassword ? (
        <RegistrationForm setIsSamePassword={setIsSamePassword} />
      ) : isSamePassword === 1 ? (
        <Navigate to="/home" />
      ) : (
        <>
          <RegistrationForm setIsSamePassword={setIsSamePassword} />
          <div className="d-flex justify-content-center mt-1 mb-2">
            <div style={{ width: "20rem" }}>
              Passwords do not match. <br /> Please check your entry again.
            </div>
          </div>
        </>
      )}
    </>
  );
}
