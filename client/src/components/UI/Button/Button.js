import React from "react";
import cls from "./Button.module.css";

export default function Button(props) {
  return (
    <button className={cls.Button} onClick={props.clickHandler}>
      {props.children}
    </button>
  );
}
