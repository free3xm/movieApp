import React from "react";
import cls from "./MoviesPage.module.css";
import Movie from "../../components/Movie/Movie";
import Loader from "../../components/UI/Loader/Loader";

function MoviesPage(props) {
  return (
    <div className={cls.MoviesPage}>
      <h2>
        <i className="fas fa-film"></i> Movies by categories
      </h2>
      <ul className={cls.MoviesFilter}>
        <li>Now playing</li>
        <li>Up coming</li>
        <li>Popular</li>
        <li>Top Rated</li>
      </ul>
      <div className={cls.Movies}>
        {props.loading ? (
          <Loader />
        ) : (
          props.movies.results.map((movie, i) => (
            <Movie movie={movie} key={movie.title + i} />
          ))
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
