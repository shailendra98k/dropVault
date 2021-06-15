import './App.css'
import Dropbox from  './components/Dropbox'  
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return(
    <Router>
        <Switch>
          <Route exact path="/">  <Home/> </Route>
          <Route exact path="/login"> <Login/> </Route> 
          <Route exact path="/register"> <Register/> </Route>
        </Switch>
    </Router>)
}

export default App;
