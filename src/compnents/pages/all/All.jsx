import React from 'react'
import './All.css'
import MovieBox from '../../movieBox/MovieBox'
import { useLoaderData } from 'react-router-dom'
function All() {
  const data = useLoaderData()
  console.log(data)
  return (
    <div className='movieBox-all'>
      <div className='movieBox-all-input'>
        <input type='text' placeholder='Search for movie or Tv-series'/>
        
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

////////////loader func
export const loaderData = async ()=>{
 
  
}