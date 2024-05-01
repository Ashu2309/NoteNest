import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "./NotesFolder/NoteContext";

const Signup = ({ showAlert }) => {
  const history = useHistory();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const inputEvent = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleEvent = async (e) => {
    e.preventDefault();
    const host = process.env.REACT_APP_PORT;
    if (credentials.password === credentials.cpassword) {
      const response = await fetch(`${host}api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
        }),
      });
      const json = await response.json();
      //console.log(json);
      if (json.success) {
        //save auth token
        //redirect
        // localStorage.setItem("token", json.authToken);

        showAlert("Registred Successfully", "success");
        history.push("/");
      } else {
        showAlert("Invalid Credentials", "danger");
      }
    } else {
      showAlert("Password Don't Match !", "danger");
    }
  };
  return (
    <>
      <div className="mt-5 px-2 py-5 w-75 shadow-lg container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-primary" style={{ textShadow: "2px 2px 2px cyan" }}>
          Signup
        </h1>
        <form
          className="row g-3 needs-validation d-flex align-items-center justify-content-center"
          validate
          onSubmit={handleEvent}
        >
          <div className="w-75">
            <h5
              htmlFor="validationCustom01"
              className="form-p font-weight-bolder text-primary"
            >
              Name
            </h5>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              placeholder="your name"
              name="name"
              required
              onChange={inputEvent}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="w-75">
            <h5
              htmlFor="validationCustom01"
              className="form-p font-weight-bolder text-primary"
            >
              Email Address
            </h5>
            <input
              type="email"
              className="form-control"
              id="validationCustom01"
              placeholder="Email Address"
              name="email"
              required
              onChange={inputEvent}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="w-75">
            <h5
              htmlFor="validationCustom01"
              className="form-p font-weight-bolder text-primary"
            >
              Password
            </h5>
            <input
              type="password"
              className="form-control"
              id="validationCustom01"
              placeholder="Your password"
              name="password"
              required
              onChange={inputEvent}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="w-75">
            <h5
              htmlFor="validationCustom01"
              className="form-p font-weight-bolder text-primary"
            >
              Confirm Password
            </h5>
            <input
              type="password"
              className="form-control"
              id="validationCustom01"
              placeholder="confirm password"
              name="cpassword"
              required
              onChange={inputEvent}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="w-75">
            <button className="btn btn-info text-light" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
