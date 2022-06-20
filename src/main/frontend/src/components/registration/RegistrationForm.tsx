import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataApi } from "../../shared/DataApi";
import { useAuthStoreContext } from "../Store";

interface Props {
  setIsSamePassword: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function RegistrationForm(props: Props) {
  const { dispatch } = useAuthStoreContext();
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const { setIsSamePassword } = props;
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password1 == password2) {
      setIsSamePassword(1);
      dataApi(
        "POST",
        "/signup",
        () => {
          const bodyData = new FormData();
          bodyData.append("username", email);
          bodyData.append("password", password1);
          axios.post("/login", bodyData).then(() => {
            dispatch({ type: "LOGGED_IN"});
            navigate("/profile/new");
          });
        },
        { email, password: password1 }
      );
    } else {
      setIsSamePassword(2);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card mt-4 mb-2" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Registration</h5>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label mt-2">
              {" "}
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password1" className="form-label mt-2">
              {" "}
              Password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              minLength={3}
              className="form-control"
              onChange={(e) => setPassword1(e.target.value)}
              value={password1}
              required
            />
            <label htmlFor="password2" className="form-label mt-2">
              {" "}
              Passwort Confirmation
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              className="form-control"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              required
            />
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-warning btn-block">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
