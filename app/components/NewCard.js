import React, { Component } from "react";
import CardForm from "./CardForm";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class NewCard extends Component {
  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: "",
      description: "",
      status: "todo",
      color: "#c9c9c9",
      tasks: []
    });
  }
  handleChange(field, value) {
    this.setState({ [field]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.cardCallbacks.add(this.state);
    this.props.history.push("/");
  }
  handleClose(e) {
    this.props.history.push("/");
  }
  render() {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        handleClose={e => this.handleClose(e)}
      />
    );
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object
};
export default withRouter(NewCard);
