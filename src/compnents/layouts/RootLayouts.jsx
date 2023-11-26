import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import './RootLayouts.css'
import logo from '../../assets/monero.svg'
function RootLayouts() {
  return (
    <div className='root-layouts'>
      
      <nav>
        <div className='root-layouts__img'><img src={logo}/></div>
        <ul>
        <NavLink to={'/'}>All</NavLink>
        <NavLink to={'movies'}>Movies</NavLink>
        <NavLink to={'tv-series'}>Tv-series</NavLink>
        <NavLink to={'book-marks'}>Bookmarks</NavLink>
        </ul>
       <div>
       <NavLink to={'account'}>Account</NavLink>
       </div>
        

      </nav>
    
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayouts
