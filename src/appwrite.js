import {Client , Databases , ID , Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID ; 
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID ; 
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID ;

const client = new Client ()
 .setEndpoint('https://cloud.appwrite.io/v1')
 .setProject(PROJECT_ID);

 const database  = new Databases(client) ; 


 //to update the search Count ; 
export const updateSearchCount = async (searchTerm , movie) => {
   //  1.Use appwrite SDK to check if the search term already exists in databse ; 
   
   try{
     const result = await database.listDocuments(DATABASE_ID , COLLECTION_ID, [Query.equal('searchTerm' ,searchTerm ),
     ])
   
      //  2.If it does , update its count 

     if(result.documents.length > 0){
      const doc = result.documents[0] ; 

      await database.updateDocument(DATABASE_ID , COLLECTION_ID ,doc.$id , {
       count : doc.count + 1 , 
      })
     }
    else{
      await database.createDocument(DATABASE_ID , COLLECTION_ID , ID.unique() , {
         searchTerm , 
         count : 1 , 
         movie_id : movie.id , 
          poster_url : `https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`, 

      }) 
    }

   }

   
    catch(error){
    console.log(error) ; 
    }
  
   //  3.if it doesnt  , create a new document with the search term count as 1 ; 

}


export const getTrendingMovies = async() => {
     try{
       const result = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
         Query.limit(5) , 
         Query.orderDesc("count")
       ])

       return result.documents ; 
         
     }
     catch(error){
         console.log(error) ; 
     } 

}


 