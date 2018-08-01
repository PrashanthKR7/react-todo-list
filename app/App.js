import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import BoardContainer from "./components/BoardContainer";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <BoardContainer />
  </Router>,
  document.getElementById("root")
);

/* import ContactsAppContainer from './ContactMiniApp/ContactsAppContainer'

  ReactDOM.render(<ContactsAppContainer />, document.getElementById('root')); */
