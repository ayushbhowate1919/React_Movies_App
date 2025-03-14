//import React from 'react'
import MovieCard from './Components/MovieCard.jsx';
import Search from './Components/Search.jsx'  
import Spinner from './Components/spinner.jsx'
import {useEffect , useState } from 'react'
import {useDebounce} from 'react-use'
import {  getTrendingMovies, updateSearchCount } from './appwrite.js';


//API config here : 
const API_BASE_URL = 'https://api.themoviedb.org/3' ; 
 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY ; 

const API_OPTIONS = {
  method : 'GET' , 
  headers : {
    accept  : 'application/json' , 
    Authorization : `Bearer ${API_KEY}`
    
  }
}

const App = () => {
  
  const [searchTerm , setSearchTerm] = useState('') ;
  const [errorMessage , setErrorMessage] = useState(''); 
  //empty array ; 
  const [movieList ,setMovieList] = useState([]) ; 
  //loading state ;   
  const [isLoading , setIsLoading] = useState(false);

  //for debounce , to delay the sending of search query : delay of 500 ms
  const [debouncedSearchTerm , setDebouncedSearchTerm] = useState('');

  //for trending movies ; 
  const [trendingMovies , setTrendingMovies] = useState([]);



  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);   

 
    //another API implementation using async : 
    const fetchMovies = async (query = '') => {

       

      setIsLoading(true);
      setErrorMessage('');
      //try catch func : try catch finally : 3 blocks ; 
      try{
        const endpoint = query 
                         ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`  
                         :  `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` ;
        
        //this fetches the data : 
        const response = await fetch(endpoint ,API_OPTIONS );
        
          //in case of error only
          if(!response.ok){
            throw new Error('Failed to fetch movies');
          }
          
          //parsing JSON data : 
          const data = await response.json();
          console.log(data) ; 

           if(data.Response === 'False'){
            setErrorMessage(data.Error || 'Failed to fetch movies');
            setMovieList([]);
            return;
           }

           setMovieList(data.results || []);

           //updateSearchCount();

           if(query && data.results.length > 0){
            await updateSearchCount(query , data.results[0]);
           }



      } catch(error){
            console.log(`Error fetching movies :${error}`);
            setErrorMessage('Error Fetching movies . please try again later');     
      }
      finally {
        //no matter what stop loading ; 
        setIsLoading(false) ; 
      }
    }


    const loadTrendingMovies = async () => {
      try {
           const movies  = await getTrendingMovies() ; 
           setTrendingMovies(movies);
      } 
       catch(error){
      console.log(`Error fetching trending movies : ${error}`) ; 
       } 
    }



  useEffect(()=> {
    fetchMovies(debouncedSearchTerm);
  } , [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies() ; 
  } , []) ; 



  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
         <header>
          <img src="./hero.png" alt='Hero Banner' />
          <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>


          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
         </header>
         
         {/* two props are being passed to this component , searchTerm and setSearchTerm 
                

         */}


         <section className='trending'>
        <ul>
          {trendingMovies.map((movie , index)=>(
            <li key={movie.$id}>
           <p>{index + 1}</p>
           <img src={movie.poster_url} alt = {movie.title} />

            </li>
          ))}
        </ul>

         </section>
        <section className="all-movies">
          <h2>
            All Movies
          </h2>
        
          

          {isLoading ? (<div className='text-white'><Spinner/></div>) :
                        errorMessage ? (
                          <p className='text-red-500'>{errorMessage}</p>
                        )  : (
                          <ul>
                            {movieList.map((movie) => (
                              
                              <MovieCard key = {movie.id} movie = {movie} />

                            ))}
                          </ul>
                        )
          }
           
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        </section>
         
       </div>
    </main>     
  )
}

export default App