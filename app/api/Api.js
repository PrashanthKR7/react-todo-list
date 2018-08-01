import "whatwg-fetch";
import "babel-polyfill";

const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: "any-string-you-like" // The Authorization is not needed for local server
};

let API = {
  fetchCards() {
    return fetch(`${API_URL}/cards`, { headers: API_HEADERS }).then(response =>
      response.json()
    );
  },

  addCard(card) {
    return fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(card)
    }).then(response => response.json());
  },

  updateCard(card, draftCard) {
    return fetch(`${API_URL}/cards/${card.id}`, {
      method: "PUT",
      headers: API_HEADERS,
      body: JSON.stringify(draftCard)
    });
  },

  persistCardDrag(cardId, status, index) {
    return fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({ status, row_order_position: index })
    });
  },

  addTask(cardId, task) {
    return fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(task)
    }).then(reponse => response.json());
  },

  deleteTask(cardId, task) {
    return fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "DELETE",
      headers: API_HEADERS
    });
  },

  toggleTask(cardId, task) {
    return fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "PUT",
      headers: API_HEADERS,
      body: JSON.stringify({ done: !task.done })
    });
  }
};

export default API;
