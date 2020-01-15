import React, { Fragment } from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.Input];
  const labelClass = props.isLabelVisible
    ? classes.LabelVisible
    : classes.Label;

  if (!props.isValid && props.isTouched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <Fragment>
          <label className={labelClass} htmlFor={props.key}>
            {props.label}
          </label>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.validate}
            id={props.key}
          />
        </Fragment>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.validate}
          id={props.key}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.validate}
          id={props.key}
          name={props.elementConfig.name}
        >
          {props.elementConfig.options.map(option => {
            const name = option.lastname
              ? `${option.name} ${option.lastname}`
              : option.name;
            return (
              <option key={option.id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      );
      break;
    case "radio__group":
      inputElement = (
        <div className={classes.Input__Group}>
          {props.elementConfig.options.map(element => {
            return (
              <Fragment key={element.id}>
                <input
                  className={inputClasses.join(" ")}
                  {...element.elementConfig}
                  onChange={props.handleChange}
                  onBlur={props.validate}
                  id={element.name}
                  checked={props.value === element.elementConfig.value}
                />
                <label htmlFor={element.name} className={classes.LabelVisible}>
                  {element.label}
                </label>
              </Fragment>
            );
          })}
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.validate}
          id={props.key}
        />
      );
  }

  return inputElement;
};

export default Input;
