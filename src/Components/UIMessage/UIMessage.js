import React from "react";
import classes from "./UIMessage.module.css";

const UIMassage = props => {
  return (
    <div className={classes.Block}>
      <h1 className={classes[`Heading_${props.type}`]}>{props.heading}</h1>
      <p className={classes.Body}>{props.body}</p>
    </div>
  );
};

export default UIMassage;
