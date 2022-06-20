import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStoreContext } from "./Store";

export default function Navbar() {
  const { authStore, dispatch } = useAuthStoreContext();

  // const handleCollapse = () => {

  // }
  const handleLogout = () => {
    axios
      .post("/perform_logout")
      .then(() => {
        dispatch({ type: "LOGGED_OUT" });
        sessionStorage.removeItem("loggedIn");
      })
      .catch((e) => console.log(e));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink
          to="/"
          className="navbar-brand"
          aria-current="page"
          style={{ textDecoration: "none" }}
        >
          Date4u
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {authStore.isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/search" className="nav-link">
                    Search
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item mx-2-md">
              {!authStore.isLoggedIn ? (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              ) : (
                <NavLink to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              )}
            </li>
            {!authStore.isLoggedIn && (
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
