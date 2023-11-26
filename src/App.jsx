
import './App.css'
import RootLayouts from './compnents/layouts/RootLayouts'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
//pages
import All, { loaderData } from './compnents/pages/all/All'
import Tvseries from './compnents/pages/tvSeries/Tvseries'
import Movies from './compnents/pages/movies/Movies'
import Bookmarks from './compnents/pages/bookmarks/Bookmarks'
import Account from './compnents/pages/account/Account'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayouts/>}>
      <Route index  element={<All/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/tv-series' element={<Tvseries/>}/>
      <Route path='/book-marks' element={<Bookmarks/>}/>
      <Route path='/account' element={<Account/>}/>
    </Route>
  )
)
function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
