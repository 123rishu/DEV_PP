import React, { Component } from "react";
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets.js";

class App extends Component {
  state = { 
    moviesData: [],
    currentMovie: "avengers"
   };

   async componentDidMount(){
    //API CALL
    //params -> key, page, query
    //https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
    let data = await axios.get(API_URL+"/search/movie" , { 
      params: {api_key: API_KEY, page: 1, query:this.state.currentMovie } 
    });

    let moviesData = data.data.results;
    this.setState({
      moviesData:moviesData
    })
  }

  setMovies = async(newMovieName) => {
    // https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
      let dataFromSearch = await axios.get(API_URL + "/search/movie", {
        params: {api_key: API_KEY, page: 1, query:newMovieName }, 
      });
      let moviesData = dataFromSearch.data.results.slice(0, 10);
      this.setState({
        moviesData:moviesData,
        currentMovie:newMovieName
      })
  }

  render() { 
    return ( 
        <div className="App">
          <Header setMovies={this.setMovies}></Header>
          <Movies movies={this.state.moviesData}></Movies>
        </div> 
    );
  }
}

export default App;