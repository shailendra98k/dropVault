import './App.css'
import Dropbox from  './components/Dropbox'  
import Home from './components/Home'
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/">  <Home/> </Route>  
      </Switch>
    </Router>)
}

export default App;
