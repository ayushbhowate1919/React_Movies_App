//import React from 'react'
import PropTypes from 'prop-types'

const Search = ({searchTerm, setSearchTerm}) => {
 
  // observe this is how a search field is declared in react ; 

  //value = {searchTerm} : whatever the string searchTerm has , 
  //value will display that ;
  
  
  //onChange , function is triggered , whenever , key is pressed in placeholder
  //then the text is passed to setSearchterm which sets the searchterm , 
  //which will be shown in input field;
  

  return (
     <div className='search'>
      <div>
     <img src="search.svg" alt='search'/> 
     <input
       type ="text"
       placeholder='Search Through thousand of movies'

       value = {searchTerm}
       onChange = {(e)=> setSearchTerm(e.target.value) }
     />
    
     </div>
    
     </div>
     
  )
}


Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search
 