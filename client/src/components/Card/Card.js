import React from "react";
import cls from "./Card.module.css";

function Card(props) {
  return (
    <div className={cls.Card}>
      {props.imgUrl ? (
        <img
          src={`https://image.tmdb.org/t/p/w138_and_h175_face${props.imgUrl}`}
          alt="person"
        />
      ) : (
        <div className={cls.Card_noImage_holder}>
          <i className="fas fa-user"></i>
        </div>
      )}
      <h3>{props.name}</h3>
      <p>{props.secondaryInfo}</p>
    </div>
  );
}

export default Card;
