import React, { Fragment, useState } from "react";
import FormSection from "../../Containers/FormSection/FormSection";
import Button from "../../Containers/Button/Button";
import classes from "./Form.module.css";
import InputWrapper from "../../Containers/InputWrapper/InputWrapper";
import Input from "../../Containers/Input/Input";
import ErrorTooltip from "../../Containers/ErrorTooltip/ErrorTooltip";

const Form = () => {
  const [isDisabled, setDisabled] = useState(true);
  const handleSubmit = () => {};
  const handleButtonClick = () => {};
  const isValid = true;

  return (
    <Fragment>
      <header className={classes.Header}>
        <h1>New Event</h1>
      </header>
      <form onSubmit={handleSubmit} className={classes.Form}>
        <FormSection name="About">
          <InputWrapper label="title" isRequired={true}>
            <div className={classes.InputField}>
              <Input
                elementType="input"
                elementConfig={{
                  type: "text",
                  placeholder: "Make it Short and Clear"
                }}
                isLabelVisible={false}
              />
            </div>
            {isValid && (
              <ErrorTooltip
                className={classes.Error}
                errorMassage="Required name"
              />
            )}
          </InputWrapper>
        </FormSection>
        <FormSection name="Coordinator">
          <p>here</p>
        </FormSection>
        <FormSection name="When">
          <p>here</p>
        </FormSection>
        <Button
          name="Publish Event"
          clickHandler={handleButtonClick}
          disabled={isDisabled}
        />
      </form>
    </Fragment>
  );
};

export default Form;
