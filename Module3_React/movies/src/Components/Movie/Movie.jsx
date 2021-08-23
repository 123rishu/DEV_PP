import React, { useState, useContext, useEffect } from 'react';
import firebaseDB from "../../config/firebase";
import { IMAGE_URL, API_URL, API_KEY } from "../../API/secrets";
import "./Movie.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Movie = (props) => {
  const history = useHistory();
  let { poster_path, title, vote_average } = props.movieObject;
  let posterPath = IMAGE_URL + poster_path;

  const handleMovieClick = (e) => {
    history.push(`/moviepage/${props.movieObject.id}`);
  }

  return (
    <div className="movie-item">

      <div className="movie-poster">
          <img src={posterPath} onClick={handleMovieClick} alt="" />
      </div>

      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-rating">{vote_average} IMDB</div>
      </div>

    </div>
  );
}

export default Movie;

// class Movie extends Component {
//     state = { 
//       detailedMovieObj: {},
//     }

//     async componentDidMount(){
//       // https://api.themoviedb.org/3/movie/299534?api_key=bdd243ea847239dc0799805e63e189f0
//       let data = await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
//       let detailedMovieObj = data.data;
//       let posterPath = IMAGE_URL+detailedMovieObj.poster_path;
//       this.setState({
//         detailedMovieObj:{ ...detailedMovieObj, poster_path:posterPath },
//       });
//     }


//     render() {
//         let myLikedMovies = this.props.myLikedMovies;
//         let { poster_path, title, vote_average } = this.props.movie;
//         let posterPath = IMAGE_URL + poster_path;
//         return (
//           <div className="movie-item">

//             <div className="movie-poster">
//               <Link to={{pathname:"/moviepage", state: {detailedMovieObj: this.state.detailedMovieObj, myLikedMovies: myLikedMovies}, 
//                      }}><img src={posterPath} alt="" /></Link>
//             </div>

//             <div className="movie-info">
//               <div className="movie-title">{title}</div>
//               <div className="movie-rating">{vote_average} IMDB</div>
//             </div>

//           </div>
//         );
//       }
// }


// export default Movie;