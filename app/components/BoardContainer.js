import React, { Component } from "react";
import Board from "./Board";
import "whatwg-fetch";
import "babel-polyfill";
import update from "react-addons-update";
import { throttle } from "../utils";
import { Container } from "flux/utils";
import CardActionCreators from "../actions/CardActionCreators";
import CardStore from "../stores/CardStore";

const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: "any-string-you-like" // The Authorization is not needed for local server
};
class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
  }

  addCard(card) {
    let prevState = this.state;

    if (card.id == null) {
      let card = { ...card, id: Date.now() };
    }

    let nextState = update(this.state.cards, { $push: [card] });
    this.setState({ cards: nextState });

    fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then(responseDate => {
        card.id = responseDate.id;
        this.setState({ cards: nextState });
      })
      .catch(error => {
        this.setState(prevState);
      });
  }

  updateCard(card) {
    let prevState = this.state;

    let cardIndex = this.state.cards.findIndex(c => c.id == card.id);

    let nextState = update(this.state.cards, {
      [cardIndex]: { $set: card }
    });

    this.setState({ cards: nextState });

    fetch(`${API_URL}/cards/${card.id}`, {
      method: "PUT",
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        this.setState(prevState);
      });
  }

  addTask(cardId, taskName) {
    const prevState = this.state;
    console.log(prevState);
    let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    let newTask = { id: Date.now(), name: taskName, done: false };

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then(responseData => {
        newTask.id = responseData.id;
        this.setState({ cards: nextState });
      })
      .catch(error => {
        console.error("Add error:", error);
        this.setState(prevState);
      });
  }

  deleteTask(cardId, taskId, taskName) {
    const prevState = this.state;
    const cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    const taskIndex = this.state.cards[cardIndex].tasks.findIndex(
      task => task.id == taskId
    );
    const nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    this.setState({ cards: nextState });

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: "delete",
      headers: API_HEADERS
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch(error => {
        console.error("Delete error:", error);
        this.setState(prevState);
      });
  }

  toggleTask(cardId, taskId, taskName) {
    const cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    let newDoneValue;
    const taskIndex = this.state.cards[cardIndex].tasks.findIndex(
      task => task.id == taskId
    );
    const nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: done => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    this.setState({ cards: nextState });

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: "put",
      headers: API_HEADERS,
      body: JSON.stringify({ done: newDoneValue })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch(error => {
        console.error("Update error:", error);
        this.setState(prevState);
      });
  }

  updateCardStatus(cardId, listId) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    // Get the current card
    let card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
        })
      );
    }
  }

  updateCardPosition(cardId, afterId) {
    if (cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      let card = this.state.cards[cardIndex];
      let afterIndex = this.state.cards.findIndex(card => card.id === afterId);

      this.setState(
        update(this.state, {
          cards: {
            $splice: [[cardIndex, 1], [afterIndex, 0, card]]
          }
        })
      );
    }
  }

  persistCardDrag(cardId, status) {
    let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    let card = this.state.cards[cardIndex];

    fetch(`${API_URL}/cards/${cardId}`, {
      method: "put",
      headers: API_HEADERS,
      body: JSON.stringify({
        status: card.status,
        row_order_position: cardIndex
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server reponse wasn't OK");
        }
      })
      .catch(error => {
        console.error("Fetch error: ", error);
        this.setState(
          update(this.state, {
            cards: {
              [cardIndex]: {
                status: { $set: status }
              }
            }
          })
        );
      });
  }

  componentDidMount() {
    fetch(API_URL + "/cards", { headers: API_HEADERS })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ cards: data });
      });
  }

  render() {
    return (
      <Board
        cards={this.state.cards}
        taskCallbacks={{
          toggle: this.toggleTask.bind(this),
          delete: this.deleteTask.bind(this),
          add: this.addTask.bind(this)
        }}
        cardCallbacks={{
          updateStatus: this.updateCardStatus.bind(this),
          updatePosition: this.updateCardPosition.bind(this),
          addCard: this.addCard.bind(this),
          updateCard: this.updateCard.bind(this),
          persistCardDrag: this.persistCardDrag.bind(this)
        }}
      />
    );
  }
}

BoardContainer.getStores = () => [CardStore];
BoardContainer.calculateState = prevState => ({
  cards: CardStore.getState()
});

export default Container.create(BoardContainer);
