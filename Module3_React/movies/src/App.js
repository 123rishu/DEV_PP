import React, { Component } from "react";
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets.js";

class App extends Component {
  state = { 
    moviesData: [],
    currentMovie: "avenger"
   };

  componentDidMount(){
    //API CALL
    //params -> key, page, query
    //https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
    axios.get(API_URL+"/search/movie" , { 
      params: {api_key: API_KEY, page: 1, query:this.state.currentMovie } 
    }).then( (data) => {
      let moviesData = data.data.results;
      this.setState({
        moviesData:moviesData
      })
    })
  }


  render() { 
    return ( <div className="App">
      <Header></Header>
      <Movies movies={this.state.moviesData}></Movies>
    </div> );
  }
}

export default App;