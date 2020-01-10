import React, { Fragment, useState } from "react";
import FormSection from "../../Components/FormSection/FormSection";
import Button from "../../Components/Button/Button";
import classes from "./Form.module.css";
import InputWrapper from "../../Components/InputWrapper/InputWrapper";
import Input from "../../Components/Input/Input";
import ErrorTooltip from "../../Components/ErrorTooltip/ErrorTooltip";
import formStructure from "../../Data/FormStructure";

const Form = () => {
  const elements = {};

  for (let key in formStructure) {
    const element = formStructure[key];
    const jsx = (
      <InputWrapper
        key={key}
        label={element.elementConfig.name}
        isRequired={element.validationRules.required}
      >
        <Input
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          isLabelVisible={element.isLabelVisible}
          handleChange={e => console.dir(e.target.name)}
        />
        {element.valid && element.touched && (
          <ErrorTooltip errorMassage={element.errorMassage} />
        )}
      </InputWrapper>
    );
    elements[key] = jsx;
  }

  const {
    title,
    description,
    category,
    payment,
    reward,
    responsible,
    email,
    startsOn,
    duration
  } = elements;

  return (
    <Fragment>
      <header className={classes.Header}>
        <h1>New Event</h1>
      </header>
      <form className={classes.Form}>
        <FormSection name="About">
          {title}
          {description}
          {category}
          {payment}
          {reward}
        </FormSection>
        <FormSection name="Coordinator">
          {responsible}
          {email}
        </FormSection>
        <FormSection name="When">
          {startsOn}
          {duration}
        </FormSection>
        <Button name="Publish Event" />
      </form>
    </Fragment>
  );
};

export default Form;
