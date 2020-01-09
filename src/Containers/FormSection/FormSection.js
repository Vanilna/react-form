import React from "react";
import classes from "./FormSection.module.css";

const FormSection = props => (
  <section className={classes.Section}>
    <h2 className={classes.Section__heading}>{props.name}</h2>
    {props.children}
  </section>
);

export default FormSection;
