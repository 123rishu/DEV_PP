import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../config/firebase";
import { AuthContext } from "../../context/AuthProvider";
import "./MoviePage.css"
import { IMAGE_URL } from "../../API/secrets";
import Youtube from "react-youtube";
import axios from "axios";
import { API_URL, API_KEY } from "../../API/secrets";

const MoviePage = (props) => {
    let [videoObject, setVideoObject] = useState({});
    let [isLiked, setIsLiked] = useState(false);
    let { currUser } = useContext(AuthContext);
    let { id } = useParams();
    let [currUserObject, setCurrUserObject] = useState({});
    let [detailedMovieObject, setDetailedMovieObject] = useState({});
    let { title, tagline, vote_average, poster_path, overview } = detailedMovieObject;
    // let [opts, setOpts] = useState({});
    console.log(detailedMovieObject);

    const toggleLikedIcon = async () => {
        //agar ye already liked hai
        //toh isLiked ko false karna hai
        //Aur DB ke andar array me se isko remove karna hai
        if (isLiked) {
            //agar ye already liked hai
            //toh isLiked ko false karna hai
            //Aur DB ke andar array me se isko remove karna hai
            let currMovieId = id;
            let updatedMyLikedMovies = currUserObject.likedMovies.filter((curr) => {
                if (curr == currMovieId) {
                    return false;
                }
                else {
                    return true;
                }
            });

            //isko db me dalna hai
            currUserObject.likedMovies = updatedMyLikedMovies;
            await firebaseDB.collection("users").doc(currUser.uid).set(currUserObject);
            setIsLiked(false);
        }
        else {
            //agar ye already disliked hai
            //toh isLiked ko true karna hai
            //Aur DB ke andar array me se isko add karna hai
            let currMovieId = id;
            currUserObject.likedMovies.push(currMovieId);
            await firebaseDB.collection("users").doc(currUser.uid).set(currUserObject);
            setIsLiked(true);
        }
    }

    useEffect(async () => {
        //Movieobject ka id ki help se detailMovieObject nikal rhe hai
        let data = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
        let detailedMovieObj = data.data;
        let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
        detailedMovieObj.poster_path = posterPath;

        //id ki help se movie ka video nikal rhe hai
        let data2 = await axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        let allVideosData = data2.data.results;
        let videoObject = allVideosData.filter((currVideoObj) => {
            if (currVideoObj.type == "Trailer" && currVideoObj.site == "YouTube") {
                return true;
            }
            else {
                return false;
            }
        })

        //firebase se current live user ki liked movies ka array nikal rhe hai
        let uid = currUser.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let userDataObject = doc.data();
        //isLiked ko last time ke according set karo
        let currMoviePageId = id;
        userDataObject.likedMovies.map((curr) => {
            if (curr == currMoviePageId) {
                setIsLiked(true);
            }
        })
        setDetailedMovieObject(detailedMovieObj);
        setCurrUserObject(userDataObject);
        setVideoObject(videoObject[0]);
    }, [])

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
                {/* isLiked ke according like icon ki rendering hogi */}
                {
                    isLiked == true ? (
                        <div className="likeIcon">
                            <i className="fas fa-heart" onClick={() => { toggleLikedIcon(); }}></i>
                        </div>
                    ) : (
                        <div className="likeIcon" >
                            <i className="far fa-heart empty" onClick={() => { toggleLikedIcon(); }}></i>
                        </div>
                    )
                }

                {
                    videoObject ? (
                        <div className="movie-trailer">
                            <Youtube videoId={videoObject.key}
                                opts={{
                                    height: "100%",
                                    width: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                    },
                                }}
                                ></Youtube>
                        </div>
            ) : (
            <h1>Movie Not Found</h1>
            )
                }

        </div>

        </div >
    );
}

export default MoviePage;

// class MoviePage extends Component {
//     state = { 
//         videoObject: {},
//         isLiked: false,
//      };

//      async componentDidMount(){
//         //https://api.themoviedb.org/3/movie/299536/videos?api_key=22c80894f6d873434847bec78664b84b&language=en-US
//         let data = await axios.get(`${API_URL}/movie/${this.props.location.state.detailedMovieObj.id}/videos?api_key=${API_KEY}&language=en-US`);
//         let allVideosData = data.data.results;
//         let videoObject = allVideosData.filter((currVideoObj) => {
//             if(currVideoObj.type == "Trailer" && currVideoObj.site == "YouTube"){
//                 return true;
//             }
//             else{
//                 return false;
//             }
//         })
//         this.setState({
//             videoObject:videoObject[0],
//         });
//      }

//      makeTrue = (id) => {
//         this.props.location.state.myLikedMovies.push(id);
//         this.setState({
//             isLiked: true,
//         })
//      }

//      makeFalse = (id) => {
//         //let myLikedMovies = this.props.location.state.myLikedMovies;
//         // let updatedLikedMovies = [];
//         // for(let i=0;i<myLikedMovies.length;i++){
//         //     if(myLikedMovies[i] != id){
//         //         updatedLikedMovies.push(myLikedMovies[i]);
//         //     }
//         // }
//         let myLikedMovies = this.props.location.state.myLikedMovies;
//         const index = myLikedMovies.indexOf(id);
//         if (index > -1) {
//         this.props.location.state.myLikedMovies.splice(index, 1);
//         }

//         this.setState({
//             isLiked:false,
//         })
//      }

//     render() { 
//         const opts = {
//             height:"100%",
//             width: "100%",
//             playerVars: {
//               autoplay: 1,
//             },
//           };

//         let { title, tagline, vote_average, poster_path, overview, id } = this.props.location.state.detailedMovieObj;
//         let myLikedMovies = this.props.location.state.myLikedMovies;
//         let flag = false;
//         for(let i=0;i<myLikedMovies.length;i++){
//             if(id == myLikedMovies[i]){
//                 flag = true;
//             }
//         }

//         return ( 
//                 <div className="movie-page">

//                     <div className="movie-page-poster">
//                         <img src={poster_path} alt="" />
//                     </div>

//                     <div className="movie-page-details">

//                         <div className="movie-title-info">
//                             <h1>{title} <br></br> {vote_average} IMDB</h1>

//                             <span>{tagline}</span>
//                             <p>{overview}</p>
//                         </div>

//                         {/* conditional rendering */}
//                         {
//                             flag == true ? (
//                                 <div className="likeIcon">
//                                     <i className="fas fa-heart" onClick={()=>{this.makeFalse(id);}}></i>
//                                 </div>
//                             ) : (
//                                 <div className="likeIcon" >
//                                     <i className="far fa-heart empty" onClick={()=>{this.makeTrue(id);}}></i>
//                                 </div>
//                             )
//                         }

//                         {
//                             this.state.videoObject ? (
//                                 <div className="movie-trailer">
//                                     <Youtube videoId={this.state.videoObject.key} opts={opts}></Youtube>
//                                 </div>
//                             ) : (
//                                 <h1>Movie Not Found</h1>
//                             )
//                         }

//                     </div>

//                 </div>
//             );
//     }
// }

// export default MoviePage;