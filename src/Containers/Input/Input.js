import React from "react";
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
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join("")}
          value={props.value}
          onChange={props.handleChange}
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
        />
      );
  }

  return (
    <label
      className={props.isLabelVisible ? classes.LabelVisible : classes.Label}
    >
      {inputElement}
      {props.label}
    </label>
  );
};

export default Input;
