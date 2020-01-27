import React from "react";
import cls from "./Movie.module.css";
import { Colors } from "../UI/Colors/Colors";
import { Genres } from "./Genres/Genres";
import { withRouter } from "react-router-dom";

function Movie(props) {
  const MovieStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w400${props.movie.poster_path})`
  };
  const randomBg = {
    backgroundColor: Colors[Math.floor(Math.random() * (18 + 1))]
  };
  function openMovieHandler(props) {
    props.history.push(`/movie/${props.movie.id}`);
  }
  return props.header ? (
    <div
      className={cls.Movie}
      style={MovieStyles}
      onClick={() => openMovieHandler(props)}
    ></div>
  ) : (
    <div
      className={cls.Movie_wrapper}
      onClick={() => openMovieHandler(props)}
      style={randomBg}
    >
      <div className={cls.Movie_MoviePage} style={MovieStyles}></div>
      <div className={cls.Movie_info}>
        <h2>{props.movie.title}</h2>
        <p className={cls.Info_descr}>{props.movie.overview}</p>
        <p className={cls.Movie_genres}>
          {props.movie.genre_ids.map(e => `${Genres[e]} `)}
        </p>
        <p className={cls.Info_descr}>
          <i className="fas fa-star"></i> {props.movie.vote_average} &nbsp;
          <i className="fas fa-user"></i> {props.movie.vote_count}
        </p>
      </div>
    </div>
  );
}
export default withRouter(Movie);
