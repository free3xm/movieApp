import React from "react";
import cls from "./Placeholder.module.css";

export default function Placeholder(props) {
  return (
    <div className={cls.Placeholder} style={{width: props.width, height: props.height}}>
      <i className="far fa-image"></i>
    </div>
  );
}
