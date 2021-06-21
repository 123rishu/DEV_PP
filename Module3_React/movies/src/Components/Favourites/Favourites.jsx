import React, { Component } from 'react';
import Favourite from '../Favourite/Favourite';

class Favourites extends Component {
    state = { 

     };


    render() { 
        let myLikedMovies = this.props.location.state.myLikedMovies;
        return ( 
                <div className="Fav-list">
                     {
                         myLikedMovies.length == 0 ? (
                            <h1>No Movie Liked Yet</h1>
                         ) : (
                            myLikedMovies.map(function(currMovieId){
                                return <Favourite
                                key={currMovieId} 
                                movieID={currMovieId}
                                myLikedMovies = {myLikedMovies}
                                ></Favourite> 
                            })
                         )
                        
                    }
                </div>
            );
    }
}
 
export default Favourites;