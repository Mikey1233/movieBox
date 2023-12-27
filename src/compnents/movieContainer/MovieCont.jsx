import React from "react";
import "./MovieCont.css";
const movieSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-film"
    viewBox="0 0 16 16"
  >
    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
  </svg>
);
const Tvseries = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-tv"
    viewBox="0 0 16 16"
  >
    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
  </svg>
);
const Bookmarks = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="12"
    viewBox="0 0 384 512"
  >
    <path
      fill="#fff"
      d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
    />
  </svg>
);
function MovieCont({ year, title, type, image }) {
  return (
    <div className="movieCont">
      <div className="book-mark">{Bookmarks}</div>
      {/* <FontAwesomeIcon icon="fa-thin fa-bookmark" style={{color: "#000000",}} /> */}
      <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt="pic" />
      <div className="movieCont-content">
        <div className="movieCont-content_details">
          <span>{year}</span>
          <span>.</span>
          {type === "movie" ? (
            <span>
              {movieSvg}
              {" " + type}
            </span>
          ) : (
            <span>
              {Tvseries}
              {" " + type}
            </span>
          )}
        </div>
        <h4>{title}</h4>
      </div>
    </div>
  );
}

export default MovieCont;
