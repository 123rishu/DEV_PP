import React, { Component } from 'react';
import "./MoviePage.css"
import Youtube from "react-youtube";
import axios from "axios";
import { API_URL, API_KEY } from "../../API/secrets";

class MoviePage extends Component {
    state = { 
        videoObject: {},
        isLiked: false,
     };

     async componentDidMount(){
        //https://api.themoviedb.org/3/movie/299536/videos?api_key=22c80894f6d873434847bec78664b84b&language=en-US
        let data = await axios.get(`${API_URL}/movie/${this.props.location.state.detailedMovieObj.id}/videos?api_key=${API_KEY}&language=en-US`);
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

     makeTrue = (id) => {
        this.props.location.state.myLikedMovies.push(id);
        this.setState({
            isLiked: true,
        })
     }

     makeFalse = (id) => {
        //let myLikedMovies = this.props.location.state.myLikedMovies;
        // let updatedLikedMovies = [];
        // for(let i=0;i<myLikedMovies.length;i++){
        //     if(myLikedMovies[i] != id){
        //         updatedLikedMovies.push(myLikedMovies[i]);
        //     }
        // }
        let myLikedMovies = this.props.location.state.myLikedMovies;
        const index = myLikedMovies.indexOf(id);
        if (index > -1) {
        this.props.location.state.myLikedMovies.splice(index, 1);
        }
                    
        this.setState({
            isLiked:false,
        })
     }
    
    render() { 
        const opts = {
            height:"100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          };
        
        let { title, tagline, vote_average, poster_path, overview, id } = this.props.location.state.detailedMovieObj;
        let myLikedMovies = this.props.location.state.myLikedMovies;
        let flag = false;
        for(let i=0;i<myLikedMovies.length;i++){
            if(id == myLikedMovies[i]){
                flag = true;
            }
        }

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

                        {/* conditional rendering */}
                        {
                            flag == true ? (
                                <div className="likeIcon">
                                    <i className="fas fa-heart" onClick={()=>{this.makeFalse(id);}}></i>
                                </div>
                            ) : (
                                <div className="likeIcon" >
                                    <i className="far fa-heart empty" onClick={()=>{this.makeTrue(id);}}></i>
                                </div>
                            )
                        }

                        {
                            this.state.videoObject ? (
                                <div className="movie-trailer">
                                    <Youtube videoId={this.state.videoObject.key} opts={opts}></Youtube>
                                </div>
                            ) : (
                                <h1>Movie Not Found</h1>
                            )
                        }
                        
                    </div>

                </div>
            );
    }
}
 
export default MoviePage;