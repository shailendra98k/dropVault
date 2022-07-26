import './App.css'
import Dropbox from  './components/Dropbox'  
import Home from './pages/Home'
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import React , {useState}  from 'react';


export const AppContext = React.createContext();
function App() {
  
  const [directories,setDirectories] = useState([])
  const [files,setFiles] = useState([])
  const [currDir, setCurrDir] = useState('/')
  const [breadcrumbsList, setBreadcrumbsList] = useState(["Home"])

  const defaultContext = {
    currDir:currDir,
    setCurrDir:setCurrDir,
    files:files,
    setFiles:setFiles,
    directories:directories,
    setDirectories:setDirectories,
    breadcrumbsList:breadcrumbsList,
    setBreadcrumbsList:setBreadcrumbsList
  }
  
  return(
    <AppContext.Provider value={defaultContext} >
      <Router>
        <Switch>
          <Route exact path="/"> <Home/></Route>
          <Route exact path="/sign-in">  <SignIn/> </Route> 
          <Route exact path="/sign-up">  <SignUp/> </Route>  
        </Switch>
      </Router>
    </AppContext.Provider>
    )
}

export default App;
