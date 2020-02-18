import React, { useEffect, useState } from "react";
import cls from "./Auth.module.css";
import { scroller } from "react-scroll";
import { validate } from "../../utils/validator";
import { connect } from "react-redux";
import login, { clearErr } from "../../store/actions/auth";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Loader from "../../components/UI/Loader/Loader";
import Modal from "../../components/UI/Error/Modal";

function Auth(props) {
  const [fields, setFields] = useState({
    login: {
      value: "",
      touched: false,
      err: null
    },
    password: {
      value: "",
      touched: false,
      err: null
    },
    canSubmit: false
  });

  function changeFields(e) {
    const newFields = { ...fields };
    newFields[e.target.name] = {
      value: e.target.value.trim().toLowerCase(),
      touched: true,
      err: validate(e.target)
    };
    newFields.canSubmit =
      !newFields.password.err &&
      newFields.password.touched &&
      !newFields.login.err &&
      newFields.login.touched
        ? true
        : false;
    setFields(newFields);
  }

  useEffect(() => {
    scroller.scrollTo("auth", {
      duration: 1500,
      delay: 100,
      smooth: "easeInCubic"
    });
  }, []);

  useEffect(() => {
    if (props.isLogin) {
      props.history.push("/");
    }
  }, [props.isLogin, props.history]);
  console.log(props.err);
  return (
    <div className={cls.Auth} name="auth">
      <form className={cls.AuthForm} onSubmit={e => e.preventDefault()}>
        {props.loading ? (
          <Backdrop>
            <Loader />
          </Backdrop>
        ) : null}
        {props.err ? (
          <Modal message={props.err} clickHandler={props.clearErr} />
        ) : null}
        <h2>Sign In</h2>
        <div className={cls.inputWrapper}>
          <input
            id="login"
            name="login"
            className={cls.login}
            type="text"
            onChange={changeFields}
            value={fields.login.value}
            required
          />
          <label htmlFor="login">Login</label>
          {fields.login.err ? <span>{fields.login.err}</span> : null}
        </div>
        <div className={cls.inputWrapper}>
          <input
            id="password"
            name="password"
            className={cls.password}
            type="password"
            onChange={changeFields}
            value={fields.password.value}
            required
          />
          <label htmlFor="password">Password</label>
          {fields.password.err ? <span>{fields.password.err}</span> : null}
        </div>
        <div className={cls.BtnWrapper}>
          <button
            disabled={!(fields.login.value && fields.password.value)}
            onClick={() =>
              props.login(
                {
                  login: fields.login.value,
                  password: fields.password.value
                },
                "signin"
              )
            }
          >
            Sign In
          </button>
          <button
            disabled={!fields.canSubmit}
            onClick={() =>
              props.login(
                {
                  login: fields.login.value,
                  password: fields.password.value
                },
                "signup"
              )
            }
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    isLogin: state.auth.isLogin,
    err: state.auth.err
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: (user, type) => dispatch(login(user, type)),
    clearErr: () => dispatch(clearErr())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
