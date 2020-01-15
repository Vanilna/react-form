import React, { Fragment, useState } from "react";
import FormSection from "../../Components/FormSection/FormSection";
import Button from "../../Components/Button/Button";
import classes from "./Form.module.css";
import InputWrapper from "../../Components/InputWrapper/InputWrapper";
import Input from "../../Components/Input/Input";
import ErrorTooltip from "../../Components/ErrorTooltip/ErrorTooltip";
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
          <InputWrapper label="title" isRequired={true}>
            {title}
            {!elementsConfig.title.valid && elementsConfig.title.touched && (
              <ErrorTooltip errorMassage={elementsConfig.title.errorMassage} />
            )}
          </InputWrapper>
          <InputWrapper label="description" isRequired={true}>
            {description}
            {!elementsConfig.description.valid &&
              elementsConfig.description.touched && (
                <ErrorTooltip
                  errorMassage={elementsConfig.description.errorMassage}
                />
              )}
          </InputWrapper>
          <InputWrapper label="category" isRequired={false}>
            {category}
            {!elementsConfig.category.valid &&
              elementsConfig.category.touched && (
                <ErrorTooltip
                  errorMassage={elementsConfig.category.errorMassage}
                />
              )}
          </InputWrapper>
          <InputWrapper label="payment" isRequired={false}>
            <div className={classes.inline}>
              {payment}
              {elementsConfig.payment.value === "paid" && (
                <Fragment>{fee}</Fragment>
              )}
            </div>
            {!elementsConfig.payment.valid &&
              elementsConfig.payment.touched && (
                <ErrorTooltip
                  errorMassage={elementsConfig.payment.errorMassage}
                />
              )}
          </InputWrapper>
          <InputWrapper label="reward" isRequired={false}>
            {reward}
            {!elementsConfig.reward.valid && elementsConfig.reward.touched && (
              <ErrorTooltip errorMassage={elementsConfig.reward.errorMassage} />
            )}
          </InputWrapper>
        </FormSection>
        <FormSection name="Coordinator">
          <InputWrapper label="responsible" isRequired={true}>
            {responsible}
            {!elementsConfig.responsible.valid &&
              elementsConfig.responsible.touched && (
                <ErrorTooltip
                  errorMassage={elementsConfig.responsible.errorMassage}
                />
              )}
          </InputWrapper>
          <InputWrapper label="email" isRequired={false}>
            {email}
            {!elementsConfig.email.valid && elementsConfig.email.touched && (
              <ErrorTooltip errorMassage={elementsConfig.email.errorMassage} />
            )}
          </InputWrapper>
        </FormSection>
        <FormSection name="When">
          <InputWrapper label="starts on" isRequired={true}>
            <div className={classes.inline}>
              {date}
              {time}
              {period}
            </div>
            {!elementsConfig.date.valid && elementsConfig.date.touched && (
              <ErrorTooltip errorMassage={elementsConfig.date.errorMassage} />
            )}
            {!elementsConfig.time.valid && elementsConfig.time.touched && (
              <ErrorTooltip errorMassage={elementsConfig.time.errorMassage} />
            )}
            {!elementsConfig.period.valid && elementsConfig.period.touched && (
              <ErrorTooltip errorMassage={elementsConfig.date.errorMassage} />
            )}
          </InputWrapper>
          <InputWrapper label="duration" isRequired={false}>
            {duration}
            {!elementsConfig.duration.valid &&
              elementsConfig.duration.touched && (
                <ErrorTooltip
                  errorMassage={elementsConfig.duration.errorMassage}
                />
              )}
          </InputWrapper>
        </FormSection>
        <Button name="Publish Event" type="submit" disabled={!isFromValid} />
      </form>
    </Fragment>
  );
};

export default Form;
