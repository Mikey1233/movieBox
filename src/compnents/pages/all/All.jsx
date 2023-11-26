import React from 'react'
import './All.css'
import MovieBox from '../../movieBox/MovieBox'
import { useLoaderData } from 'react-router-dom'
function All() {
  const data = useLoaderData()
  console.log(data.results)
  //trending movie 
  const trending = data.results
  return (
    <div className='movieBox-all'>
      <div className='movieBox-all-input'>
        <input type='text' placeholder='Search for movie or Tv-series'/>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
      </div>
      <div className='movieBox-all-content'>
        <h2>Trending</h2>
       <div className='movieBox-all__trending'>
        <MovieBox/>
        <MovieBox/>
        <MovieBox/>
        <MovieBox/>

       </div>
       <div className='movieBox-all-recommend'>
        <h2>Recommended for you</h2>
        <div className='movieBox-all-recommend__contents'>
          
        <MovieBox/>
         
          <MovieBox/>
          <MovieBox/>
          <MovieBox/>
          <MovieBox/>
         
         <MovieBox/>
         <MovieBox/>
         <MovieBox/>
        
          
         
         
        



        </div>
       
       </div>
      </div>
      
    </div>
  )
}

export default All
//78393d09e7d06dc8a1d807120b3c221e
////////////loader func
export const loaderData = async ()=>{
  const options = {
    method: 'GET',
  };
  
const data = await fetch( 'https://api.themoviedb.org/3/trending/all/day?api_key=78393d09e7d06dc8a1d807120b3c221e', options)
if (!data.ok) {
  throw Error('Could not find that career.')
}
  return data.json()
}


// fetch(language=en-US', options)
  