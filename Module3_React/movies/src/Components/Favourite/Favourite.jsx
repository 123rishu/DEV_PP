import axios from 'axios';
import React, { Component, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../API/secrets';
import { Link } from 'react-router-dom';
import "./Favourite.css";

class Favourite extends Component {
    state = { 
        detailedMovieObj:{},
     };

     async componentDidMount(){
        // https://api.themoviedb.org/3/movie/299534?api_key=bdd243ea847239dc0799805e63e189f0
        let data = await axios.get(`${API_URL}/movie/${this.props.movieID}?api_key=${API_KEY}`);
        let detailedMovieObj = data.data;
        let posterPath = IMAGE_URL+detailedMovieObj.poster_path;
        this.setState({
          detailedMovieObj:{ ...detailedMovieObj, poster_path:posterPath },
        });
      }

    render() { 
        return ( 
            <div className="movie-item">

            <div className="movie-poster">
              <Link to={{pathname:"/moviepage", state: {detailedMovieObj: this.state.detailedMovieObj, myLikedMovies: this.props.myLikedMovies}, 
                     }}><img src={this.state.detailedMovieObj.poster_path} alt="" /></Link>
            </div>

            <div className="movie-info">
              <div className="movie-title">{this.state.detailedMovieObj.title}</div>
              <div className="movie-rating">{this.state.detailedMovieObj.vote_average} IMDB</div>
            </div>

            </div>
            );
    }
}
 
export default Favourite;