import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import NoteState from "./Components/NotesFolder/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import React, { useState } from "react";
import Alert from "./Components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />

          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
          </Switch>
        </Router>
      </NoteState>
      <h1>App</h1>
    </>
  );
}

export default App;
