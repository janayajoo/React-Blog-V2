import React, { useState, useEffect } from 'react';
import {Navbar, BlogPost, BlogList, Favorite, WatchList} from './Components'; 
import {Route, Routes} from 'react-router-dom';
import { listContext } from './Components/MovieContext';
import { getFromFirebaseTop } from './Helpers/FirebaseHelper';
import { LoginButton } from './Components/Login';


function App() {

  const [movieList,setMovieList] =useState([]);
  const [movieListWatch,setMovieListWatch] =useState([]);



  useEffect(() =>{
    const fetchData = async() =>{
      const results = await getFromFirebaseTop('My Favorite Movie Collection', 5);
      setMovieList(results);
    };

    const fetchDataWatch = async() =>{
      const results = await getFromFirebaseTop('My Watchlist Collection', 5);
      setMovieListWatch(results);
    };

    fetchDataWatch();
    fetchData();
  },[]);

  const providerValues = movieList;
  const providerValuesWatch = movieListWatch;

  return (
    <React.Fragment>
      <listContext.Provider value = {[providerValues, providerValuesWatch]}>
        <Navbar/>
        <Routes>
          <Route path="/BlogPost" element={<BlogPost/>}/>
          <Route path="/BlogList" element={<BlogList/>}/>
          <Route path="/Favorite" element={<Favorite/>}/>
          <Route path="/WatchList" element={<WatchList/>}/>
        </Routes>
      </listContext.Provider>
    </React.Fragment>
  );
}

export default App;
