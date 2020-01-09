import React from "react";
import classes from "./Button.module.css";

const Button = props => (
  <button
    onClick={props.clickHandler}
    className={classes.Button}
    disabled={props.disabled}
  >
    {props.name}
  </button>
);

export default Button;
