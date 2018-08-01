import React from "react";
import List from "./List";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Link, Route } from "react-router-dom";
import EditCard from "./EditCard";
import NewCard from './NewCard';

const Board = props => {
  const { cards, taskCallbacks, cardCallbacks } = props;
  return (
    <div className="app">
      <Link to="/new" className="float-button">
        +
      </Link>
      <List
        id="todo"
        title="To Do"
        cards={cards.filter(card => card.status === "todo")}
      />

      <List
        id="in-progress"
        title="In Progress"
        cards={cards.filter(card => card.status === "in-progress")}
      />

      <List
        id="done"
        title="Done"
        cards={cards.filter(card => card.status === "done")}
      />
      <Route path="/new" component={NewCard} />
      <Route path={`/edit/:card_id`} render={() => <EditCard {...props} />} />
    </div>
  );
};

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

export default DragDropContext(HTML5Backend)(Board);
