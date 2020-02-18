import React from "react";
import cls from "./User.module.css";
import Button from "../UI/Button/Button";

function User(props) {
  return (
    <div className={cls.User}>
      <p>
        <i className="fas fa-user"> </i>&nbsp;
        {props.name}
        <Button clickHandler={props.logout}>Logout</Button>
      </p>
    </div>
  );
}
export default User;
