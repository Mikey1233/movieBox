import React from 'react'
import { Outlet } from 'react-router-dom'

function MovieLay() {
  return (
    <div>
      <h2>Movies</h2>
      <Outlet/>
    </div>
  )
}

export default MovieLay
