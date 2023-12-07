import React from "react";
import { useRef } from "react";
import "./All.css";
import MovieBox from "../../movieBox/MovieBox";
import MovieCont from "../../movieContainer/MovieCont";
import { useLoaderData } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const search = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-search"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
);
function All() {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const data = useLoaderData();
  const trending = data[0].results;
  const recommend = data[1].results;
  const popular = data[2].results;
  const upcoming = data[3].results;

  return (
    <div className="movieBox-all">
      <div className="movieBox-all-input">
        <input type="text" placeholder="Search for movie or Tv-series" />
        {search}
      </div>
      <div className="movieBox-all-content">
        <h2>Trending</h2>

        <Slider
          ref={sliderRef}
          {...settings}
          className="movieBox-all__trending"
        >
          {trending.map((arr) => (
            <MovieBox
              title={arr.title || arr.name}
              year={
                arr.release_date?.slice(0, 4) || arr.first_air_date.slice(0, 4)
              }
              type={arr.media_type}
              image={arr.poster_path}
            />
          ))}
        </Slider>
        <div className="movieBox-all-recommend">
          <h2>Recommended for you</h2>
          <div className="movieBox-all-recommend__contents">
            {recommend.map((arr) => (
              <MovieCont
                title={arr.title || arr.name}
                year={
                  arr.release_date?.slice(0, 4) ||
                  arr.first_air_date.slice(0, 4)
                }
                type={"movie"}
                image={arr.poster_path}
              />
            ))}
          </div>
        </div>
        <div className="movieBox-all-recommend">
          <h2>Top Rated</h2>
          <div className="movieBox-all-recommend__contents">
            {popular.map((arr) => (
              <MovieCont
                title={arr.title || arr.name}
                year={
                  arr.release_date?.slice(0, 4) ||
                  arr.first_air_date.slice(0, 4)
                }
                type={"movie"}
                image={`https://image.tmdb.org/t/p/w500/${arr.poster_path}`}
              />
            ))}
          </div>
        </div>
        <div className="movieBox-all-recommend">
          <h2>Upcoming</h2>
          <div className="movieBox-all-recommend__contents">
            {upcoming.map((arr) => (
              <MovieCont
                title={arr.title || arr.name}
                year={
                  arr.release_date?.slice(0, 4) ||
                  arr.first_air_date.slice(0, 4)
                }
                type={"movie"}
                image={`https://image.tmdb.org/t/p/w500/${arr.poster_path}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default All;
//api key//78393d09e7d06dc8a1d807120b3c221e
////////////loader func
const fetchApiData = async (url, opt) => {
  const response = await fetch(url, opt);
  const data = await response.json();
  return data;
};
export const loaderData = async () => {
  const options = {
    method: "GET",
  };
  const dataArr = {
    0: "https://api.themoviedb.org/3/trending/all/day?api_key=78393d09e7d06dc8a1d807120b3c221e",
    1: `https://api.themoviedb.org/3/discover/movie?api_key=78393d09e7d06dc8a1d807120b3c221e`,
    2: "https://api.themoviedb.org/3/movie/top_rated?api_key=78393d09e7d06dc8a1d807120b3c221e",
    3: "https://api.themoviedb.org/3/movie/upcoming?api_key=78393d09e7d06dc8a1d807120b3c221e",
  };
  const response = [];
  for (let i = 0; i < 4; i++) {
    response.push(fetchApiData(dataArr[i], options));
  }
  const data = await Promise.all(response);

  return data;
};

