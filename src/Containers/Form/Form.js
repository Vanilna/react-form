import React, { useState, useEffect, useReducer } from "react";
import formStructure from "../../Data/formStructure";
import classes from "./Form.module.css";

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
  let errorMassage = "";

  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        [name]: {
          ...state[name],
          value: value,
          valid: true,
          touched: true,
          errorMassage: ""
        }
      };
    case "REQUIRED":
      const isEmpty = value.trim() === "";
      if (isEmpty) errorMassage = `${name} is required`;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: !isEmpty,
          touched: true,
          errorMassage: errorMassage
        }
      };
    case "DECIMALS":
      //check how many decimals are there
      //allow them due to rules configuration
      const dotIndex = value.indexOf(".");
      const isInteger = dotIndex === -1;
      //return state unchanged
      //because empty return or break erase state
      if (isInteger) {
        return {
          ...state
        };
      }
      const allowedDecimals = action.payload.quantity;
      const actualDecimals = value.length - 1 - dotIndex;
      let areDecimalsValid = actualDecimals <= allowedDecimals;
      if (!areDecimalsValid)
        errorMassage = `Only ${allowedDecimals} decimals are allowed`;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: areDecimalsValid,
          touched: true,
          errorMassage: errorMassage
        }
      };
    case "NATIVE":
      //use native validation to prevent from entering .-+eE
      //in invalid positions in number inputs
      //without this, empty input value is returned
      const valid = action.payload.nativelyValid;
      if (!valid) errorMassage = `Invalid ${name}`;
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: valid,
          touched: true,
          errorMassage: errorMassage
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
      if (!isEmailValid) errorMassage = "Email not valid";
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: isEmailValid,
          touched: true,
          errorMassage: errorMassage
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
      if (!isDateValid) errorMassage = "Date can't be in past";
      return {
        ...state,
        [name]: {
          ...state[name],
          valid: isDateValid,
          touched: true,
          errorMassage: errorMassage
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
      if (
        elementsState[key].required ||
        (key === "fee" && elementsState.payment.value === "paid")
      ) {
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

  const handleInputChange = (event, name) => {
    const value = event.target.value;
    const nativelyValid = event.target.validity.valid;
    const rules = elementsState[name].validationRules;
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

  const handleSubmit = e => {
    e.preventDefault();

    const convertTime = (time, period) => {
      const timeArr = time.split(":");
      const [hours, minutes] = timeArr;
      let hoursTransformed = hours;
      if (hours === "12" && period === "AM") {
        hoursTransformed = "00";
      } else if (period === "PM") {
        hoursTransformed = hours === "12" ? 12 : parseFloat(hours) + 12;
      }
      return `${hoursTransformed}:${minutes}`;
    };

    const result = {};
    for (let key in elementsState) {
      switch (key) {
        case "category":
          const categoryState = elementsState.category;
          const selectedC = categoryState.elementConfig.options.find(
            el => categoryState.value === el.name
          );
          result.category = selectedC.id === 100 ? null : selectedC.id;
          break;
        case "payment":
          result["paid_event"] = elementsState.payment.value === "paid";
          break;
        case "fee":
          result["event_fee"] = parseFloat(elementsState.fee.value);
          break;
        case "reward":
          result.reward = parseFloat(elementsState.reward.value);
          break;
        case "date":
          const time = elementsState.time.value;
          const period = elementsState.period.value;
          const timeTransformed = convertTime(time, period);
          result.date = `${elementsState.date.value}T${timeTransformed}`;
          break;
        case "duration":
          result.duration = parseFloat(elementsState.duration.value) * 60;
          break;
        case "responsible":
          const name = elementsState.responsible.value.split(" ")[0];
          const selectedR = elementsState.responsible.elementConfig.options.find(
            option => option.name === name
          );
          const email = elementsState.email.value
            ? elementsState.email.value
            : selectedR.email;
          const responsible = {
            email: email,
            id: selectedR.id
          };
          result.coordinator = responsible;
          break;
        case "email":
          break;
        case "time":
          break;
        case "period":
          break;
        default:
          result[key] = elementsState[key].value;
      }
    }
    console.log(result);
    props.history.push("/success");
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
        handleChange={e => handleInputChange(e, key)}
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

  //elements ready to use in form
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
    <form className={classes.Form} onSubmit={handleSubmit}>
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
          invalid={!elementsState.reward.valid && elementsState.reward.touched}
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
  );
};

export default Form;
