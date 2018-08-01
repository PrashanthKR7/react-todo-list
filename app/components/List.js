import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import constants from "../constants";
import CardActionCreators from "../actions/CardActionCreators";

const listTargetSpec = {
  hover(props, monitor) {
    const dragged = monitor.getItem();
    CardActionCreators.updateCardStatus(dragged.id, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const List = ({ cards, title, connectDropTarget }) => {
  var cards = cards.map(card => {
    return <Card key={card.id} {...card} />;
  });
  return connectDropTarget(
    <div className="list">
      <h1>{title}</h1>
      {cards}
    </div>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
