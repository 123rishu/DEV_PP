import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import "./Movies.css";

class Movies extends Component {
  state = {  }
  render() { 
    return ( <React.Fragment>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
    </React.Fragment> );
  }
}
 
export default Movies;