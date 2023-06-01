
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { collection, getDocs} from "firebase/firestore"; 
import { db } from "../firebase";
import { addFavoriteFirebase } from "../Helpers/FirebaseHelper";

function BlogList() {

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "2a4d79c57d6b96b0996d6ca104a61817";

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [favMovies, setFavMovies] = useState("");
  const [watchMovies, setWatchMovies] = useState("");

  const fetchMovies = async (searchKey) => {
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

  useEffect(() => {      
    fetchMovies();

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
  }, [favMovies, watchMovies]);

  const addFavorite = async (id, title, overview, imageURL, fav) => {
    let date = new Date();
    let createdAt=(date.getTime());

    if(favMovies.length === 0){
      addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, fav, createdAt}}, "My Favorite Movie Collection");
      alert("La pelicula no se encuentra como Favorita, ya fue agregada");

    } else{
      for(let index = 0; index <= favMovies.length; index++){
        const element = favMovies[index];
        if(element.title === title){      
          alert("La pelicula si se encuentra como Favorita");
          break;
        } else {          
          addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, fav, createdAt}}, "My Favorite Movie Collection");
          alert("La pelicula no se encuentra como Favorita, ya fue agregada");
          break;
        }
      }
    }
  }

  const addWatchList = async (id, title, overview, imageURL, watch) => {
    let date = new Date();
    let createdAt=(date.getTime());

    if(watchMovies.length === 0){
      addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, watch, createdAt}}, "My Watchlist Collection");
      alert("La pelicula no se encuentra como Watchlist, ya fue agregada");
    } else{
      for(let index = 0; index <= watchMovies.length; index++){
        const element = watchMovies[index];
        if(element.title === title){      
          alert("La pelicula si se encuentra como Watchlist");
          break;
        } else {          
          addFavoriteFirebase({objectToSave: {id, title, overview, imageURL, watch}}, "My Watchlist Collection");
          alert("La pelicula no se encuentra como Watchlist, ya fue agregada");
          break;
        }
      }
    }
  }

  return(
      <div className='mainthing'>
        <div className="container mt-4 ">
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
    )
  }

export {BlogList} ;
