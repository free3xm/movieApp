import React, { useEffect, useState } from "react";
import cls from "./MainMovie.module.css";
import { withRouter } from "react-router-dom";
import { fetchMovie } from "../../store/actions/fetchMovie";
import { connect } from "react-redux";
import Loader from "../UI/Loader/Loader";
import Card from "../Card/Card";
import Button from "../UI/Button/Button";
import MovieInfo from "./MovieInfo/MovieInfo";

function MainMovie(props) {
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const {id} = props.match.params;

  useEffect(() => {
    props.fetchMovie(props.match.params.id);
    setShowAllCast(false);
    setShowAllCrew(false);
  }, [id]);
  console.log(props);

  return (
    <div className={cls.MainMovie}>
      {props.loading ? (
        <Loader />
      ) : (
        <>
          <h2 className={cls.Movie_title}>
            {props.movie.title} ({props.movie.release_date.slice(0, 4)})
          </h2>
          <h3 className={cls.Movie_Tagline}>{props.movie.tagline}</h3>
          <div className={cls.Movie_HeaderInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
              alt="movie poster"
            />
            <MovieInfo movie={props.movie} />
          </div>
          <h2 className={cls.Movie_Credits_Caption}>Cast</h2>
          <div className={cls.Movie_Credits}>
            {props.movie.cast.map((e, i) =>
              showAllCast || i < 7 ? (
                <Card
                  key={e.credit_id}
                  imgUrl={e.profile_path}
                  name={e.name}
                  secondaryInfo={e.character}
                />
              ) : null
            )}
          </div>
          {props.movie.cast.length > 7 ? (
            <Button clickHandler={() => setShowAllCast(!showAllCast)}>
              {showAllCast ? "Hide" : "Show more"}
            </Button>
          ) : null}
          <h2 className={cls.Movie_Caption}>Overview</h2>
          <p className={cls.Movie_Overview}>{props.movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w780${props.movie.backdrop_path}`}
            alt="movie backdrop"
          />
          <h2 className={cls.Movie_Credits_Caption}>Crew</h2>
          <div className={cls.Movie_Credits}>
            {props.movie.crew.map((e, i) =>
              showAllCrew || i < 7 ? (
                <Card
                  key={e.credit_id}
                  imgUrl={e.profile_path}
                  name={e.name}
                  secondaryInfo={e.job}
                />
              ) : null
            )}
          </div>
          {props.movie.crew.length > 7 ? (
            <Button clickHandler={() => setShowAllCrew(!showAllCrew)}>
              {showAllCrew ? "Hide" : "Show more"}
            </Button>
          ) : null}
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
