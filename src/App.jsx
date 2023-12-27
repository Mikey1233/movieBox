import "./App.css";
import RootLayouts from "./compnents/layouts/RootLayouts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//pages
import All from "./compnents/pages/all/All";
import Tvseries from "./compnents/pages/tvSeries/Tvseries";
import Movies from "./compnents/pages/movies/Movies";
import Bookmarks from "./compnents/pages/bookmarks/Bookmarks";
import { loaderData } from "./compnents/pages/all/All";
import Details from "./compnents/detailsPage/Details";
import MovieLay from "./compnents/layouts/movieLayout/MovieLay";
import TvLayout from "./compnents/layouts/tvLayout/TvLayout";
import TvDet from "./compnents/tvDetails/TvDet";
import { useState } from "react";
// import TvLayout from "./compnents/layouts/tvLayout/TvLayout";


function App() {
const [bookmark,setBookmark] = useState(false);

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayouts/>}>
        <Route index loader={loaderData} element={<All/>} />
        <Route path=":id" element={<Details bookmark={bookmark} setBookmark={setBookmark}/>} />
        <Route path="movies" element={<MovieLay />}>
          <Route index element={<Movies />} />
          <Route path=":id" element={<Details bookmark={bookmark} setBookmark={bookmark} />} />
        </Route>
        <Route path="/tv-series" element={<TvLayout />}>
          <Route index element={<Tvseries/>}/>
            <Route path=":id" element={<TvDet/>}/>
        </Route>
        <Route path="book-marks" element={<Bookmarks/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

{
  /* 


{/* <Route path="tv-series" element={<Tvseries />} /> */
}

{
}

{
  /* <Route path="book-marks" element={<Bookmarks />}></Route> */
}

{
  /* <Route path="account" element={<Account />}></Route>  */
}
