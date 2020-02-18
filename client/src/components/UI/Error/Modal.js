import React from "react";
import cls from "./Modal.module.css";
import Button from "../Button/Button";

export default function Modal(props) {
  return (
    <div className={cls.Modal}>
      <p>{props.message}</p>
      <Button clickHandler={props.clickHandler}>Close</Button>
    </div>
  );
}
