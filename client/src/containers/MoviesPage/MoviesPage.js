import React from "react";
import cls from "./MoviesPage.module.css";
import Movie from "../../components/Movie/Movie";
import Loader from "../../components/UI/Loader/Loader";
import Button from "../../components/UI/Button/Button";

function MoviesPage(props) {
  const lists = [
    ["Now playing", "now_playing"],
    ["Up coming", "upcoming"],
    ["Popular", "popular"],
    ["Top Rated", "top_rated"]
  ];
  return (
    <>
      <div className={cls.MoviesPage}>
        <h2>
          <i className="fas fa-film"></i> Movies by categories
        </h2>
        <ul className={cls.MoviesFilter}>
          {lists.map(e => (
            <li
              key={e[0]}
              className={
                props.activeList === e[1] ? cls.filterActive : cls.filter
              }
              onClick={() => props.changeList(e[1])}
            >
              {e[0]}
            </li>
          ))}
        </ul>
        <div className={cls.Movies}>
          {props.loading ? (
            <Loader />
          ) : (
            props.movies.map(page =>
              page.map((movie, i) => (
                <Movie movie={movie} key={movie.title + i} />
              ))
            )
          )}
        </div>
      </div>
      <div className={cls.ButtonWrapper}>
        <Button clickHandler={props.clickHandler}>Load more</Button>
      </div>
    </>
  );
}

export default MoviesPage;
