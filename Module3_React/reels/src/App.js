import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Feeds from './Components/Feeds';
import Header from './Components/Header';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import { AuthContext, AuthProvider } from './context/AuthProvider';

const App = () => {
  return ( 
    <AuthProvider>
      <Router>
        <div className="App">
          <Header></Header>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/signup" component={Signup}></Route>
              <PrivateRoute path="/" comp={Feeds}></PrivateRoute>
              <PrivateRoute path="/profile" comp={Profile}></PrivateRoute>
              {/* <Route path="/" component={Feeds}></Route>
              <Route path="/profile" component={Profile}></Route> */}
            </Switch>
        </div>
      </Router>
      </AuthProvider>
   );
}

function PrivateRoute(props){
  let {comp:component, path} = props;
  
  let { currUser } = useContext(AuthContext);
  return currUser ? (<Route path={path} component={component}></Route>) : (<Redirect to="/login" ></Redirect>);
}
 
export default App;

