import React from "react";
import classes from "./InputWrapper.module.css";
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";

const InputWrapper = props => (
  <div className={classes.Wrapper}>
    <p className={classes.Label}>
      {props.label}
      {props.isRequired && <span className={classes.Required}> *</span>}
    </p>
    <div className={classes.InputContent}>
      {props.children}
      {props.invalid && <ErrorTooltip errorMassage={props.errorMassage} />}
    </div>
  </div>
);

export default InputWrapper;
