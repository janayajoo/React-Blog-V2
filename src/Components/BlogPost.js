
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { addFavoriteFirebase } from "../Helpers/FirebaseHelper";
import { collection, getDocs} from "firebase/firestore"; 
import { db } from "../firebase";
import { listContext } from "./MovieContext";

function BlogPost() {

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "2a4d79c57d6b96b0996d6ca104a61817";

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const topFive = useContext(listContext);

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [favMovies, setFavMovies] = useState("");
  const [watchMovies, setWatchMovies] = useState("");

  const fetchMovies = async () => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {      
    const getMovies  = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'My Favorite Movie Collection'));
            const docs = [];
            querySnapshot.forEach((doc) => {                    
                docs.push({...doc.data(),id: doc.id});
            });
            setFavMovies(docs);
        } catch (e) {
            console.log(e);
        }
    }
  
    const getMoviesWatch  = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "My Watchlist Collection"));
        const docs = [];
        querySnapshot.forEach((doc) => {                    
            docs.push({...doc.data(),id: doc.id});
        });
        setWatchMovies(docs);
    } catch (e) {
        console.log(e);
    }
  }
    getMovies();
    getMoviesWatch();
    fetchMovies();
  }, [movies, favMovies, watchMovies]);

  const addFavorite = async (id, title, overview, imageURL, fav) => {
    let date = new Date();
    let createdAt=(date.getTime());
    if(favMovies.length == 0){
      addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, fav, createdAt}}, "My Favorite Movie Collection");
      alert("La pelicula fue agregada a favoritas");

    } else{
      for(let index = 0; index <= favMovies.length; index++){
        const element = favMovies[index];
        if(element.title == title){      
          alert("La pelicula ya se encuentra en favoritas");
          break;
        } else {          
          addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, fav, createdAt}}, "My Favorite Movie Collection");
          alert("La pelicula fue agregada a favoritas");
          break;
        }
      }
    }
  }

  const addWatchList = async (id, title, overview, imageURL, watch) => {
    let date = new Date();
    let createdAt=(date.getTime());
    if(watchMovies.length == 0){
      addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, watch,createdAt}}, "My Watchlist Collection");
      alert("La pelicula fue agregada a my watchlist");
    } else{
      for(let index = 0; index <= watchMovies.length; index++){
        const element = watchMovies[index];
        if(element.title == title){      
          alert("La pelicula ya se encuentra en my Watchlist");
          break;
        } else {          
          addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, watch,createdAt}}, "My Watchlist Collection");
          alert("La pelicula fue agregada a my Watchlist");
          break;
        }
      }
    }
  }

    return ( 
      <div className='mainthing'>
          <form className="container mb-4 search-bar" onSubmit={searchMovies}>
              <input
              type="text"
              placeholder="Search Movie"
              onChange={(e) => setSearchKey(e.target.value)}
              />
              <button className="btn btn-primary">Search</button>
          </form>

        <div className="container mt-4 ">
          <div className="clearfix">
            <div className="box movie-item">
              <h2 className ='text-center'><b>Recent 5 Favorites:</b></h2>
              <ul>
                {topFive[0].map(items => (
                  <li className="text-center" key = {items.id}>
                    {items.data.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="box movie-item">
              <h2 className ='text-center'><b>Recent 5 WatchList:</b></h2>
              <ul>
                {topFive[1].map(items => (
                  <li className="text-center" key = {items.id}>
                    {items.data.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row">
              {movies.map((movie) => (
              <div key={movie.id} className="col-ms-2 mb-2 movie-item">
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt=""
                    height="75%"
                    width="100%"
                  />
                  <hr/>   
                  <div className="favorite-center">
                    <button className="btn btn-primary favorite-center-text" id={movie.id+movie.title} onClick={() =>addFavorite(movie.id, movie.title, movie.overview, `${URL_IMAGE + movie.poster_path}`, false)}>Add To Favorite</button>
                    <button className="btn btn-primary favorite-center-text" onClick={() =>addWatchList(movie.id, movie.title, movie.overview, `${URL_IMAGE + movie.poster_path}`, true)}>Add To Watchlist</button>

                  </div>                     
                  <hr/>
                  <div className="info-text">
                    <h4 className="text-center"><u><b>{movie.title}</b></u></h4>
                    <h6 className="text-center">{movie.overview}</h6>                    
                  </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    );
  }
export {BlogPost};