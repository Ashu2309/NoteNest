import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "./NotesFolder/NoteContext";

const Login = ({ showAlert }) => {
  const history = useHistory();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const inputEvent = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleEvent = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://note-nest-gamma.vercel.app/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save auth token
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("username", credentials.email);

      showAlert("Loggedin Successfully", "success");
      history.push("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <>
      <div className="mt-5 p-5 w-50 shadow-lg container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-primary" style={{ textShadow: "2px 2px 2px cyan" }}>
          Login
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
          '
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
          <div className=" d-flex align-items-center justify-content-center">
            <div className="form-check w-75">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <h5 className="form-check-p" htmlFor="invalidCheck">
                Agree to terms and conditions
              </h5>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="w-75">
            <button className="btn btn-info text-light" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
