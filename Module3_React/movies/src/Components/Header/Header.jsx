import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  state = { 
      newMovieName:"",
   };

   handleOnChange = (e) => {
      let value = e.target.value;
      this.setState({
        newMovieName:value,
      })
   }

   handleKeyPress = (e) => {
      if(e.key === "Enter"){
          this.props.setMovies(this.state.newMovieName);
      }
   }

  render() { 
    return ( 
        <div className="header">
          <div className="logo">
            <img src="logo.svg" alt="" />
          </div>
          <div className="search-btn">
            <input 
            type="text"
            placeholder="Search"
            className="search-movies"
            onChange = {this.handleOnChange}
            onKeyPress = {this.handleKeyPress}
            value = {this.state.newMovieName}
            />
          </div>
        </div>
    );
  }
}
 
export default Header;