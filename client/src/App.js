import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import React, { useState } from "react";
import HeaderV2 from "./components/header/Header";
import { DeviceContextProvider } from "./context/DeviceContext";
import { ActionListContextProvider } from "./context/ActionListContext";
import { UploadModalContextProvider } from "./context/UploadModalContext";

export const AppContext = React.createContext();
function App() {
  const [directories, setDirectories] = useState([]);
  const [files, setFiles] = useState([]);
  const [currDir, setCurrDir] = useState("/");
  const [breadcrumbsList, setBreadcrumbsList] = useState(["Home"]);
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user"))
  );

  const defaultContext = {
    currDir: currDir,
    setCurrDir: setCurrDir,
    files: files,
    setFiles: setFiles,
    directories: directories,
    setDirectories: setDirectories,
    breadcrumbsList: breadcrumbsList,
    setBreadcrumbsList: setBreadcrumbsList,
    user: user,
    setUser: setUser,
  };

  React.useEffect(() => {
    console.log(
      "Rendering App",
      user,
      files,
      currDir,
      directories,
      breadcrumbsList
    );
  });

  return (
    <DeviceContextProvider>
      <ActionListContextProvider>
        <UploadModalContextProvider>
          <AppContext.Provider value={defaultContext}>
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
          </AppContext.Provider>
        </UploadModalContextProvider>
      </ActionListContextProvider>
    </DeviceContextProvider>
  );
}

export default App;
