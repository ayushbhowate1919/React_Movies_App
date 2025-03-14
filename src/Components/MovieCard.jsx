//import React from 'react'
import PropTypes from 'prop-types';

//destruct the movie to avoid writing movie.id , movie.title again and again ; 

const MovieCard = ({ movie : 
  {title , vote_average , poster_path , release_date , original_language} 

}) => {
  return (
    <div className='movie-card'>
    {/* https://media.themoviedb.org/t/p/w440_and_h660_face/AnDwpI8dY8iqJVUwVS5UotYAbB1.jpg */}
      <img src = {poster_path ? `https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`
       : `/no-movie.png`} 
       alt={title}
       />  
     
     <div className='mt-4'>
      <h3 className='text-lg'> {title}</h3>

     <div className='content'>
      <div className='rating'>
        <img src='star.svg' alt="star Icon"/>
        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
      </div>

      <span>•</span>
      <p className='lang'>{original_language}</p>
      <span>•</span>  
     <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
     </div>

     </div>
    </div>
  ) 
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    original_language: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;