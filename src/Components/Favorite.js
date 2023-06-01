import React, {useState, useEffect} from "react";
import { collection, getDocs} from "firebase/firestore"; 
import { deleteFromFirebase } from "../Helpers/FirebaseHelper";
import { db } from "../firebase";


function Favorite() {
    const [movies, setMovies] = useState([]);  

    const deleteFavorite = async (movie) => {
        deleteFromFirebase(movie, "My Favorite Movie Collection");
      }

    useEffect(() => {
        const getMovies  = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'My Favorite Movie Collection'));
                const docs = [];
                querySnapshot.forEach((doc) => {                    
                    docs.push({...doc.data(),id: doc.id});
                });
                setMovies(docs);
            } catch (e) {
                console.log(e);
            }
        }
        getMovies();
    }, [movies]);

    return(
        <div className='mainthing'>
          <div className="container mt-4 ">
              <div className="row">
                  {movies.map((movie) => (
                  <div key={movie.id} className="col-md-3 mb-2 movie-item">
                      <img
                          src={movie.imageURL}
                          alt=""
                          height="50%"
                          width="100%"
                      />
                      <hr/>   
                      <div className="favorite-center">
                        <button className="btn btn-primary favorite-center-text" onClick={() =>deleteFavorite(movie.id)}>Remove From Favorite</button>
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

export {Favorite};