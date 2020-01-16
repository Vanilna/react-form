import React, { Fragment, useState } from "react";
import FormSection from "../../Components/FormSection/FormSection";
import Button from "../../Components/Button/Button";
import classes from "./Form.module.css";
import InputWrapper from "../../Components/InputWrapper/InputWrapper";
import Input from "../../Components/Input/Input";
import formStructure from "../../Data/FormStructure";

const Form = () => {
  const [elementsConfig, setElementsConfig] = useState(formStructure);
  const [isFromValid, setFromValidity] = useState(false);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setElementsConfig({
      ...elementsConfig,
      [name]: {
        ...elementsConfig[name],
        value: value
      }
    });
  };

  const validate = (name, validationRules) => {
    if (!validationRules) return;

    let isValid = true;
    const errorMassage = [];
    const value = elementsConfig[name].value;

    for (let key in validationRules) {
      switch (key) {
        case "required":
          const isEmpty = value.trim() === "";
          isValid = isValid && !isEmpty;
          errorMassage.push(`${name} is required`);
          break;
        case "maxlength":
          const toLong = value.length > validationRules[key];
          isValid = isValid && !toLong;
          errorMassage.push("Text is to long");
          break;
        case "isEmail":
          if (value.trim() === "") break;
          const isEmail = value.indexOf("@") !== -1;
          isValid = isValid && isEmail;
          errorMassage.push("Not a valid email");
          break;
        case "decimals":
          const dotIndex = value.indexOf(".");
          const commaIndex = value.indexOf(",");
          const isInteger = (dotIndex || commaIndex) === -1;
          if (isInteger) break;
          const validDecimals =
            dotIndex !== -1
              ? dotIndex >= value.length - 1 - validationRules[key]
              : commaIndex >= value.length - 1 - validationRules[key];
          isValid = isValid && validDecimals;
          errorMassage.push(
            `Only ${validationRules[key]} decimals are allowed`
          );
          break;
        default:
          throw new Error("Should never reach");
      }
      if (!isValid) break;
    }
    setElementsConfig({
      ...elementsConfig,
      [name]: {
        ...elementsConfig[name],
        valid: isValid,
        touched: true,
        errorMassage: errorMassage.join(", ")
      }
    });
  };

  const elements = {};

  for (let key in elementsConfig) {
    const element = elementsConfig[key];
    const label = element.label ? element.label : key;
    const jsx = (
      <Input
        elementType={element.elementType}
        value={element.value}
        handleChange={handleChange}
        validate={() => validate(key, element.validationRules)}
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
            errorMassage={elementsConfig.title.errorMassage}
            invalid={
              !elementsConfig.title.valid && elementsConfig.title.touched
            }
          >
            {title}
          </InputWrapper>
          <InputWrapper
            label="description"
            isRequired={true}
            errorMassage={elementsConfig.description.errorMassage}
            invalid={
              !elementsConfig.description.valid &&
              elementsConfig.description.touched
            }
          >
            <div>
              {description}
              <div className={classes.AdditionalInfo}>
                <p>Max length 140 characters</p>
                <p>{elementsConfig.description.value.length}/140</p>
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
            errorMassage={elementsConfig.fee.errorMassage}
            invalid={!elementsConfig.fee.valid && elementsConfig.fee.touched}
          >
            <div className={classes.inline}>
              {payment}
              {elementsConfig.payment.value === "paid" ? fee : null}
            </div>
          </InputWrapper>
          <InputWrapper
            label="reward"
            isRequired={false}
            errorMassage={elementsConfig.reward.errorMassage}
            invalid={
              !elementsConfig.reward.valid && elementsConfig.reward.touched
            }
          >
            {reward}
          </InputWrapper>
        </FormSection>
        <FormSection name="Coordinator">
          <InputWrapper
            label="responsible"
            isRequired={true}
            errorMassage={elementsConfig.responsible.errorMassage}
            invalid={
              !elementsConfig.responsible.valid &&
              elementsConfig.responsible.touched
            }
          >
            {responsible}
          </InputWrapper>
          <InputWrapper
            label="email"
            isRequired={false}
            errorMassage={elementsConfig.email.errorMassage}
            invalid={
              !elementsConfig.email.valid && elementsConfig.email.touched
            }
          >
            {email}
          </InputWrapper>
        </FormSection>
        <FormSection name="When">
          <InputWrapper
            label="starts on"
            isRequired={true}
            errorMassage={
              elementsConfig.date.errorMassage ||
              elementsConfig.time.errorMassage
            }
            invalid={
              (!elementsConfig.date.valid && elementsConfig.date.touched) ||
              (!elementsConfig.time.valid && elementsConfig.time.touched)
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
            errorMassage={elementsConfig.duration.errorMassage}
            invalid={
              !elementsConfig.duration.valid && elementsConfig.duration.touched
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
