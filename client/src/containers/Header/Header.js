import React from "react";
import cls from "./Header.module.css";
import Slider from "react-slick";
import Movie from "../../components/Movie/Movie";
import Loader from "../../components/UI/Loader/Loader";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " " + cls.NextArrow}
      style={{ ...style, right: 30, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " " + cls.PrevArrow}
      style={{ ...style, left: 5, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function Header(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <header className={cls.Header}>
      <Slider {...settings}>
        {props.loading
          ? [0, 0, 0, 0, 0].map(() => <Loader key={Math.random()} />)
          : props.movies[0].map((movie, i) => (
              <Movie key={i + movie.title} movie={movie} header={true} />
            ))}
      </Slider>
    </header>
  );
}

export default Header;
