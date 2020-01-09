import React from "react";
import classes from "./ErrorTooltip.module.css";

const ErrorTooltip = props => (
  <div className={classes.Tooltip__Block}>
    <div className={classes.Tooltip__Arrow}></div>
    <p className={classes.Tooltip__errorMassage}>{props.errorMassage}</p>
  </div>
);

export default ErrorTooltip;
