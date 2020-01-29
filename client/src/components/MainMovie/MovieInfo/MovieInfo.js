import React from "react";
import cls from "./MovieInfo.module.css";

export default function MovieInfo(props) {
  return (
    <div className={cls.MovieInfo}>
      <p>Status: {props.movie.status}</p>
      <p>Realase date: {props.movie.release_date}</p>
      <p>Runtime: {props.movie.runtime} minutes</p>
      <p>Budget: $ {addComa(props.movie.budget)}</p>
      <p>Revenue: $ {addComa(props.movie.revenue)}</p>
      <p>{props.movie.genres.map(e => `${e.name} `)}</p>
      <p className={cls.MovieInfo_rating}>
        <span>
          <i className="fas fa-star"></i>&nbsp;{props.movie.vote_average}
        </span>
        <span>
          <i className="fas fa-user"></i>&nbsp;{props.movie.vote_count}
        </span>
      </p>
      {props.movie.production_companies.length ? (
        <>
          <h3 className={cls.ProductionCaption}>Production companies</h3>
          <div className={cls.grouping}>
            {props.movie.production_companies.map(e => (
              <div className={cls.Company} key={e.name}>
                {e.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${e.logo_path}`}
                    alt="company logo"
                  />
                ) : (
                  <p>{e.name}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
      {props.movie.production_countries.length ? (
        <>
          <h3 className={cls.ProductionCaption}>Production countries</h3>
          <div className={cls.grouping}>
            {props.movie.production_countries.map(e => (
              <p className={cls.Country} key={e.name}>
                {e.name}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function addComa(num) {
  return num
    .toString()
    .split("")
    .reverse()
    .map((e, i) => (i % 3 === 0 && i !== 0 ? e + "," : e))
    .reverse()
    .join("");
}
