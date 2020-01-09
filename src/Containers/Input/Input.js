import React, { Fragment } from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.Input];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join("")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
          id={props.key}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join("")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
          id={props.key}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join("")}
          value={props.value}
          onChange={props.handleChange}
          id={props.key}
        >
          {props.elementConfig.options.map(option => (
            <option
              key={option.id}
              value={option.value}
              disabled={option.disabled}
            >
              {option.value}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join("")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
          id={props.key}
        />
      );
  }

  return (
    <Fragment>
      {inputElement}
      <label
        className={props.isLabelVisible ? classes.LabelVisible : classes.Label}
        htmlFor={props.key}
      >
        {props.label}
      </label>
    </Fragment>
  );
};

export default Input;
