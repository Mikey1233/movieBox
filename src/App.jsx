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
import Booklayout from "./compnents/layouts/bookmarkLayout/Booklayout";
// import N from "./compnents/pages/errorPage/NotFound";
import NotFound from "./compnents/pages/errorPage/NotFound";
// import TvLayout from "./compnents/layouts/tvLayout/TvLayout";

function App() {
  const [bookmark, setBookmark] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayouts />}>
        <Route index loader={loaderData} element={<All isActive={isActive} setIsActive={setIsActive} />}/>

       
        <Route path="movies" element={<MovieLay />}>
          <Route index element={<Movies />} />
          <Route
            path="a/:id"
            element={<Details bookmark={bookmark} setBookmark={setBookmark} />}
          />
        </Route>

        <Route path="/tv-series" element={<TvLayout />}>
          <Route index element={<Tvseries />} />
          <Route
            path="b/:id"
            element={<TvDet bookmark={bookmark} setBookmark={setBookmark} />}
          />
        </Route>

        <Route path="/book-marks" element={<Booklayout />}>
          <Route
            index
            element={
              <Bookmarks isActive={isActive} setIsActive={setIsActive} />
            }
          />
          <Route
            path="movie/:id"
            element={<Details bookmark={bookmark} setBookmark={bookmark} />}
          />

          <Route
            path="tv/:id"
            element={<TvDet bookmark={bookmark} setBookmark={setBookmark} />}
          />
        </Route>
        <Route path="*" element={<NotFound/>}/>

      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

