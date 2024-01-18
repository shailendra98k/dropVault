import "./App.css";
import DRIVE from "./pages/Drive";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import React from "react";
import { Header } from "./components/header/Header";
import { DeviceContextProvider } from "./context/DeviceContext";
import { ActionListContextProvider } from "./context/ActionListContext";
import { UploadModalContextProvider } from "./context/UploadModalContext";
import { DefaultContextProvider } from "./context/DefaultContext";
import { URL_PATHS } from "./constants";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <DeviceContextProvider>
      <ActionListContextProvider>
        <UploadModalContextProvider>
          <DefaultContextProvider>
            <Header />
            <Router>
              <Switch>
                <Route exact path={URL_PATHS.HOME} component={Home} />
                <Route exact path={URL_PATHS.DRIVE} component={DRIVE} />
                <Route exact path={URL_PATHS.SIGN_IN} component={SignIn} />
                <Route exact path={URL_PATHS.SIGN_UP} component={SignUp} />
              </Switch>
            </Router>
          </DefaultContextProvider>
        </UploadModalContextProvider>
      </ActionListContextProvider>
    </DeviceContextProvider>
  );
}

export default App;
