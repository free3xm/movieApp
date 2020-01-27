import React, { useEffect } from "react";
import cls from "./MainMovie.module.css";
import { withRouter } from "react-router-dom";
import { fetchMovie } from "../../store/actions/fetchMovie";
import { connect } from "react-redux";
import Loader from "../UI/Loader/Loader";
import Card from "../Card/Card";

function addComa(num) {
  return num
    .toString()
    .split("")
    .reverse()
    .map((e, i) => (i % 3 === 0 && i !== 0 ? e + "," : e))
    .reverse()
    .join("");
}

function MainMovie(props) {
  console.log(props);
  useEffect(() => {
    props.fetchMovie(props.match.params.id);
  }, [props.match.params.id]);
  return (
    <div className={cls.MainMovie}>
      {props.loading ? (
        <Loader />
      ) : (
        <>
          <h2 className={cls.Movie_title}>
            {props.movie.title} ({props.movie.release_date.slice(0, 4)})
          </h2>
          <div className={cls.Movie_HeaderInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w400${props.movie.poster_path}`}
              alt="movie poster"
            />
            <div className={cls.Movie_subInfo}>
              <p>Status: {props.movie.status}</p>
              <p>Realase date: {props.movie.release_date}</p>
              <p>Runtime: {props.movie.runtime} minutes</p>
              <p>Budget: $ {addComa(props.movie.budget)}</p>
              <p>Revenue: $ {addComa(props.movie.revenue)}</p>
              <p>{props.movie.genres.map(e => `${e.name} `)}</p>
            </div>
          </div>
          <h2 className={cls.Movie_Cast_Caption}>Cast</h2>
          <div className={cls.Movie_Cast}>
            {props.movie.cast.map(e => (
              <Card
                key={e.credit_id}
                imgUrl={e.profile_path}
                name={e.name}
                secondaryInfo={e.character}
              />
            ))}
          </div>
          <h2 className={cls.Movie_Caption}>Overview</h2>
          <p className={cls.Movie_Overview}>{props.movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w780${props.movie.backdrop_path}`}
            alt="movie backdrop"
          />
        </>
      )}
    </div>
  );
}

function MapStateToProps(state) {
  return {
    movie: state.movieData.movie,
    loading: state.movieData.loading
  };
}
function MapDispatchToProps(dispatch) {
  return {
    fetchMovie: id => dispatch(fetchMovie(id))
  };
}
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MainMovie));
