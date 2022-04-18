import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import PrivateRoute from './Private/PrivateRoute';
import RouteLinks from './Private/RouteLinks';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <RouteLinks exact path="/login" component={Login} />
        <RouteLinks path="/register" component={Register} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />

      </Switch>
    </Router>
  );
}

export default App;
