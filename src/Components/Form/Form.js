import React, { Fragment, useState } from "react";
import FormSection from "../../Containers/FormSection/FormSection";
import Button from "../../Containers/Button/Button";
import classes from "./Form.module.css";

const Form = () => {
  const [isDisabled, setDisabled] = useState(true);
  const handleSubmit = () => {};
  const handleButtonClick = () => {};

  return (
    <Fragment>
      <header className={classes.Header}>
        <h1>New Event</h1>
      </header>
      <form onSubmit={handleSubmit} className={classes.Form}>
        <FormSection name="About">
          <p>here</p>
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
