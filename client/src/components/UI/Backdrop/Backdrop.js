import React from "react";
import cls from "./Backdrop.module.css";

export default function Backdrop(props) {
  return <div className={cls.Backdrop}>{props.children}</div>;
}
