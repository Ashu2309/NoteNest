import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import noteContext from "./NotesFolder/NoteContext";

const Navbar = () => {
  const history = useHistory();
  const logoutFn = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload(true);
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand text-info" to="#">
              iNoteBook
            </a>
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
            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active_nav"
                    exact
                    className="nav-link text-light"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active_nav"
                    exact
                    className="nav-link text-light"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>

              {!localStorage.getItem("token") ? (
                <div className="d-flex align-items-center logout-section">
                  <NavLink to="/login" className="text-decoration-none">
                    <Button variant="contained" className="bg-info mx-2 ">
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup" className="text-decoration-none">
                    <Button
                      variant="outlined"
                      className="text-info border-info bg-secondary"
                    >
                      Signup
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <form className="d-flex align-items-center">
                  <span
                    className="text-light mx-3 my-0"
                    style={{ fontSize: "20px" }}
                  >
                    {localStorage.getItem("username")}
                  </span>
                  <Button
                    variant="outlined"
                    className="text-info border-info bg-secondary"
                    onClick={logoutFn}
                  >
                    Logout
                  </Button>
                </form>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
