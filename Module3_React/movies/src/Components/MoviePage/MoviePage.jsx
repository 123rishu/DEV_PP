import React, { Component } from 'react';
import "./MoviePage.css"
import Youtube from "react-youtube";
import axios from "axios";
import { API_URL, API_KEY } from "../../API/secrets";

class MoviePage extends Component {
    state = { 
        videoObject: {},
     };

     async componentDidMount(){
        //https://api.themoviedb.org/3/movie/299536/videos?api_key=22c80894f6d873434847bec78664b84b&language=en-US
        let data = await axios.get(`${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
        let allVideosData = data.data.results;
        let videoObject = allVideosData.filter((currVideoObj) => {
            if(currVideoObj.type == "Trailer" && currVideoObj.site == "YouTube"){
                return true;
            }
            else{
                return false;
            }
        })
        this.setState({
            videoObject:videoObject[0],
        });
     }
    
    render() { 
        const opts = {
            height:"100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          };
        let { title, tagline, vote_average, poster_path, overview } = this.props.location.state;

        return ( 
                <div className="movie-page">

                    <div className="movie-page-poster">
                        <img src={poster_path} alt="" />
                    </div>

                    <div className="movie-page-details">
                        
                        <div className="movie-title-info">
                            <h1>{title} <br></br> {vote_average} IMDB</h1>
                            <span>{tagline}</span>
                            <p>{overview}</p>
                        </div>

                        <div className="movie-trailer">
                            <Youtube videoId={this.state.videoObject.key} opts={opts}></Youtube>
                        </div>

                    </div>

                </div>
            );
    }
}
 
export default MoviePage;