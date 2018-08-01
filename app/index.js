import React from "react";
import ReactDOM from "react-dom";
import BoardContainer from "./components/BoardContainer";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { requireAuth } from './utils/AuthService';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <BoardContainer />
  </Router>,
  document.getElementById("root")
);

/* import ContactsAppContainer from './ContactMiniApp/ContactsAppContainer'

  ReactDOM.render(<ContactsAppContainer />, document.getElementById('root')); */
