import React, { Component } from "react";
import Board from "./Board";
import { Container } from "flux/utils";
import CardActionCreators from "../actions/CardActionCreators";
import CardStore from "../stores/CardStore";

const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: "any-string-you-like" // The Authorization is not needed for local server
};
class BoardContainer extends Component {
  componentDidMount() {
    CardActionCreators.fetchCards();
  }

  render() {
    return <Board cards={this.state.cards} />;
  }
}

BoardContainer.getStores = () => [CardStore];
BoardContainer.calculateState = prevState => ({
  cards: CardStore.getState()
});

export default Container.create(BoardContainer);
