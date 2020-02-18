import React from "react";
import cls from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import User from "../../components/User/User";
import { useState } from "react";
import { logout } from "../../store/actions/auth";

function NavBar(props) {
  const [hover, setHover] = useState(false);

  return (
    <nav className={cls.NavBar}>
      <NavLink to="/">Home</NavLink>
      {props.isLogin ? (
        <div
          className={cls.User}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <i className="fas fa-user"></i>
          {hover ? <User name={props.userName} logout={props.logout} /> : null}
        </div>
      ) : (
        <NavLink to="/Auth">Sign In</NavLink>
      )}
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin,
    userName: state.auth.userName
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
