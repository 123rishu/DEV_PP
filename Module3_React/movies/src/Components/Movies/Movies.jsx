import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import "./Movies.css";

class Movies extends Component {
  state = {  }
  render() { 
    let moviesData = this.props.movies;
    return ( 
      <div className="movies">
        {
          moviesData.map(function(currMovieObj){
            return <Movie key={currMovieObj.id} movie={currMovieObj}></Movie>
          })
        }
      </div>
     );
  }
}
 
export default Movies;