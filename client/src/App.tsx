import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import React from "react";
import HeaderV2 from "./components/header/Header";
import { DeviceContextProvider } from "./context/DeviceContext";
import { ActionListContextProvider } from "./context/ActionListContext";
import { UploadModalContextProvider } from "./context/UploadModalContext";
import { DefaultContextProvider } from "./context/DefaultContext";


function App() {

  return (
    <DeviceContextProvider>
      <ActionListContextProvider>
        <UploadModalContextProvider>
          <DefaultContextProvider>
            <HeaderV2 />
            <Router>
              <Switch>
                <Route exact path="/">
                  {" "}
                  <Home />
                </Route>
                <Route exact path="/sign-in">
                  {" "}
                  <SignIn />{" "}
                </Route>
                <Route exact path="/sign-up">
                  {" "}
                  <SignUp />{" "}
                </Route>
              </Switch>
            </Router>
          </DefaultContextProvider>
        </UploadModalContextProvider>
      </ActionListContextProvider>
    </DeviceContextProvider>
  );
}

export default App;
