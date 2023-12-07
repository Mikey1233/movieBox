import React from 'react'
import { Outlet } from 'react-router-dom'

function TvLayout() {
  return (
    <div>
      <h2>TV series </h2>
      <Outlet/>
    </div>
  )
}

export default TvLayout
