import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import {connect} from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";

function App(props) {
  return (
      <Router>
        <div className="app">
          <Navbar/>
            <Switch>
                <Route exact path="/" component={Products}></Route>
                <Route exact path="/cart" component={Cart}></Route>
                {
                  !props.current ? (
                        <Redirect to="/"></Redirect>
                   ) : ( 
                        <Route exact path="/product/:id" component={SingleItem}></Route>
                   )
                }
            </Switch>
        </div>
      </Router>
  );
}

const mapStateToProps = (store) => {
    return {
      current : store.shop.currentItem,
    }
}

export default connect(mapStateToProps)(App);