import React from "react";
import "./style.css";
import React, { useState, useEffect } from 'react';
import axios from "axios"

const Movies = () => {
    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

    const [ moviesData, setmoviesData] = useState([])
    const [searchValue, setsearchValue] = useState("")
    const [apiUrl, setapiUrl]= useState(API_URL)
    useEffect(() => {  
      axios.get(apiUrl)
      .then(function (response) {
        setmoviesData(response.data.results);
      })
    });

    const search = (e) => {
      e.preventDefault();
      setapiUrl(SEARCH_API + searchValue);
    }

  return(
    <div>
      <nav>
        <h1>MOVIESINFO</h1>
        <form id="form" onSubmit={search}><input type="search" onInput={(e)=> setsearchValue(e.target.value) } name="search" id="search"  placeholder="Search"/></form>
      </nav>
      <div className = "movies-container">
        {moviesData.length && moviesData.map(movie => 
            <div className = "movie-card">
              <img src={IMG_PATH + movie.poster_path} />  
              <div className="movie-info">
                <div>{movie.title}</div>
                <span><i className="fas fa-star"></i>{movie.vote_average}</span>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                {movie.overview}
              </div> 
            </div>  
        )}
      </div>
    </div>
    
  );
}

export default Movies;