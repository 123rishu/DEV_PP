import React, { Component } from "react";
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";
import axios from "axios";
import Favourite from "./Components/Favourite/Favourite.jsx";
import MoviePage from "./Components/MoviePage/MoviePage.jsx";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


class App extends Component {
  state = { 
    moviesData: [],
    currentMovie: "avengers",
    pages:[],
    currentPage: 1,
   };

   async componentDidMount(){
    //API CALL
    //params -> key, page, query
    //https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
    let data = await axios.get(API_URL+"/search/movie" , { 
      params: {api_key: API_KEY, page: 1, query:this.state.currentMovie } 
    });

    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
  }

  setMovies = async(newMovieName) => {
    // https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
      let dataFromSearch = await axios.get(API_URL + "/search/movie", {
        params: {api_key: API_KEY, page: 1, query:newMovieName }, 
      });
      let totalNoOfPages = dataFromSearch.data.total_pages;
      let pages = [];
      for(let i=1;i<=totalNoOfPages;i++){
        pages.push(i);
      }
      let moviesData = dataFromSearch.data.results.slice(0, 10);
      this.setState({
        moviesData:moviesData,
        currentMovie:newMovieName,
        pages:pages,
      })
  }

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: this.state.currentPage-1, query:this.state.currentMovie }, 
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData:moviesData,
      currentPage:this.state.currentPage-1
    });
  }

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: this.state.currentPage+1, query:this.state.currentMovie }, 
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData:moviesData,
      currentPage:this.state.currentPage+1
    });
  }

  setPage = async (currentPageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: currentPageCount, query:this.state.currentMovie }, 
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData:moviesData,
      currentPage:currentPageCount
    });
  }
  

  render() { 
    return ( 
        <Router>
        <div className="App">
            <Header setMovies={this.setMovies}></Header>
            <Switch>

                <Route path="/" exact>
                    {/* condition rendering */}
                    {this.state.moviesData.length ? (
                      <React.Fragment>
                          <Movies movies={this.state.moviesData}></Movies>
                          <Pagination
                              pages={this.state.pages}
                              currentPage={this.state.currentPage}
                              previousPage = {this.previousPage}
                              nextPage = {this.nextPage}
                              setPage = {this.setPage}
                          ></Pagination>
                      </React.Fragment>
                    ) : (
                      <h1>Oops No Movies found</h1>
                    )
                    }
                </Route>

                <Route path="/fav" exact>
                    <Favourite></Favourite>
                </Route>

                <Route path="/moviepage" exact component={MoviePage}></Route>  

            </Switch> 
          </div> 
        </Router>
    );
  }
}

export default App;