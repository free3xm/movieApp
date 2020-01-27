import React from "react";
import cls from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={cls.Loader_wrapper}>
      <div className={cls.Loader_spinner}>
        <div className={cls.Loader}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
