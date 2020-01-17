import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Form from "./Containers/Form/Form";
import UIMassage from "./Components/UIMessage/UIMessage";
import classes from "./App.module.css";

function App(props) {
  return (
    <div className="App">
      <header className={classes.Header}>
        <h1>New Event</h1>
      </header>
      <Switch>
        <Route
          path="/success"
          component={() => (
            <UIMassage
              heading="Success"
              body="Event has been created."
              type="Success"
            />
          )}
        />
        <Route path="/" exact component={Form} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
