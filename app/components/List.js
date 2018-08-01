import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import constants from "../constants";

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const List = ({
  cards,
  title,
  taskCallbacks,
  cardCallbacks,
  connectDropTarget
}) => {
  var cards = cards.map(card => {
    return (
      <Card
        key={card.id}
        id={card.id}
        title={card.title}
        description={card.description}
        tasks={card.tasks}
        color={card.color}
        cardCallbacks={cardCallbacks}
        taskCallbacks={taskCallbacks}
      />
    );
  });
  return connectDropTarget(
    <div className="list">
      <h1>{title}</h1>
      {cards}
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
