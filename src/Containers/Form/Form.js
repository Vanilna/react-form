import React, { Fragment, useState, useEffect, useReducer } from "react";
import classes from "./Form.module.css";
import formStructure from "../../Data/FormStructure";

import FormSection from "../../Components/FormSection/FormSection";
import InputWrapper from "../../Components/InputWrapper/InputWrapper";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const reducer = (state, action) => {
  const name = action.payload.name;
  let value = "";
  if (action.payload.value === "" || action.payload.value) {
    value = action.payload.value;
  } else {
    value = state[name].value;
  }

  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        [name]: {
          ...state[name],
          value: value,
          valid: true,
          touched: true
        }
      };
    case "REQUIRED":
      const isEmpty = value.trim() === "";
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: !isEmpty,
          touched: true,
          errorMassage: `${name} is required`
        }
      };
    case "DECIMALS":
      //check how many decimals are there
      //allow them due to rules configuration
      const dotIndex = value.indexOf(".");
      const isInteger = dotIndex === -1;
      //return state unchanged
      //need to return state like this
      //because empty return or break erase state
      if (isInteger) {
        return {
          ...state
        };
      }
      const allowedDecimals = action.payload.quantity;
      const actualDecimals = value.length - 1 - dotIndex;
      let areDecimalsValid = actualDecimals <= allowedDecimals;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: areDecimalsValid,
          touched: true,
          errorMassage: `Only ${allowedDecimals} decimals are allowed`
        }
      };
    case "NATIVE":
      //use native validation to prevent from entering .-+eE
      //in invalid positions
      //without this empty input value is returned
      const valid = action.payload.nativelyValid;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: valid,
          touched: true,
          errorMassage: `Invalid ${name}`
        }
      };
    case "IS_EMAIL":
      //email isn't required so we can allow empty email
      //need to return state like this
      //because empty return or break erase state
      if (value.trim() === "")
        return {
          ...state
        };
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isEmailValid = regex.test(value);
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: isEmailValid,
          touched: true,
          errorMassage: "Not a valid email"
        }
      };
    case "FEE_CLEAR_UP":
      //clearing up error massages, validation and value
      //when changing from paid event to free
      return {
        ...state,
        fee: {
          ...state.fee,
          value: "",
          valid: true,
          touched: false,
          errorMassage: ""
        }
      };
    case "DATE_FROM_TODAY":
      const dateEntered = Date.parse(value);
      const today = Date.parse(action.payload.today);
      const isDateValid = dateEntered >= today;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: isDateValid,
          touched: true,
          errorMassage: "Date can't be in past"
        }
      };
    default:
      throw new Error("Should not reach here");
  }
};

const Form = props => {
  const [elementsState, dispatch] = useReducer(reducer, formStructure);
  const [isFromValid, setFromValidity] = useState(false);

  //check whole form validity
  useEffect(() => {
    let isValid = true;
    for (let key in elementsState) {
      if (elementsState[key].required) {
        isValid =
          isValid && elementsState[key].valid && elementsState[key].touched;
      } else {
        isValid = isValid && elementsState[key].valid;
      }
    }
    if (isValid !== isFromValid) {
      setFromValidity(isValid);
    }
  }, [isFromValid, elementsState, setFromValidity]);

  const handleInputChange = (event, rules, name) => {
    const value = event.target.value;
    const nativelyValid = event.target.validity.valid;
    //handle change
    dispatch({
      type: "CHANGE_VALUE",
      payload: { value: value, name: name }
    });

    //validate value
    if (!rules) return;
    rules.forEach(rule => {
      //add native validation to payload
      if (rule.type === "NATIVE") {
        rule = {
          ...rule,
          payload: {
            ...rule.payload,
            nativelyValid
          }
        };
      }
      dispatch(rule);
    });
  };

  //generate input elements due to form structure
  const elements = {};
  for (let key in elementsState) {
    const element = elementsState[key];
    const label = element.label ? element.label : key;
    const jsx = (
      <Input
        elementType={element.elementType}
        value={element.value}
        handleChange={e => handleInputChange(e, element.validationRules, key)}
        validate={() => {}}
        elementConfig={element.elementConfig}
        isLabelVisible={element.isLabelVisible}
        isValid={element.valid}
        isTouched={element.touched}
        label={label}
        id={key}
      />
    );
    elements[key] = jsx;
  }

  //form elements ready to use in form
  const {
    title,
    description,
    category,
    payment,
    fee,
    reward,
    responsible,
    email,
    date,
    time,
    period,
    duration
  } = elements;

  return (
    <Fragment>
      <header className={classes.Header}>
        <h1>New Event</h1>
      </header>
      <form className={classes.Form}>
        <FormSection name="About">
          <InputWrapper
            label="title"
            isRequired={true}
            errorMassage={elementsState.title.errorMassage}
            invalid={!elementsState.title.valid && elementsState.title.touched}
          >
            {title}
          </InputWrapper>
          <InputWrapper
            label="description"
            isRequired={true}
            errorMassage={elementsState.description.errorMassage}
            invalid={
              !elementsState.description.valid &&
              elementsState.description.touched
            }
          >
            <div>
              {description}
              <div className={classes.AdditionalInfo}>
                <p>Max length 140 characters</p>
                <p>{elementsState.description.value.length}/140</p>
              </div>
            </div>
          </InputWrapper>
          <InputWrapper label="category" isRequired={false}>
            <div>
              {category}
              <div className={classes.AdditionalInfo}>
                <p>
                  Describes topic and people who should be interested in this
                  event
                </p>
              </div>
            </div>
          </InputWrapper>
          <InputWrapper
            label="payment"
            isRequired={false}
            errorMassage={elementsState.fee.errorMassage}
            invalid={!elementsState.fee.valid && elementsState.fee.touched}
          >
            <div className={classes.inline}>
              {payment}
              {elementsState.payment.value === "paid" ? fee : null}
            </div>
          </InputWrapper>
          <InputWrapper
            label="reward"
            isRequired={false}
            errorMassage={elementsState.reward.errorMassage}
            invalid={
              !elementsState.reward.valid && elementsState.reward.touched
            }
          >
            {reward}
          </InputWrapper>
        </FormSection>
        <FormSection name="Coordinator">
          <InputWrapper
            label="responsible"
            isRequired={true}
            errorMassage={elementsState.responsible.errorMassage}
            invalid={
              !elementsState.responsible.valid &&
              elementsState.responsible.touched
            }
          >
            {responsible}
          </InputWrapper>
          <InputWrapper
            label="email"
            isRequired={false}
            errorMassage={elementsState.email.errorMassage}
            invalid={!elementsState.email.valid && elementsState.email.touched}
          >
            {email}
          </InputWrapper>
        </FormSection>
        <FormSection name="When">
          <InputWrapper
            label="starts on"
            isRequired={true}
            errorMassage={
              elementsState.date.errorMassage || elementsState.time.errorMassage
            }
            invalid={
              (!elementsState.date.valid && elementsState.date.touched) ||
              (!elementsState.time.valid && elementsState.time.touched)
            }
          >
            <div className={classes.inline}>
              {date} <span className={classes.paddingLR}>at</span>
              {time}
              {period}
            </div>
          </InputWrapper>
          <InputWrapper
            label="duration"
            isRequired={false}
            errorMassage={elementsState.duration.errorMassage}
            invalid={
              !elementsState.duration.valid && elementsState.duration.touched
            }
          >
            {duration}
          </InputWrapper>
        </FormSection>
        <Button name="Publish Event" type="submit" disabled={!isFromValid} />
      </form>
    </Fragment>
  );
};

export default Form;
