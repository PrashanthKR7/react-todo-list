import React, { Component } from "react";
import CardForm from "./CardForm";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import DraftStore from "../stores/DraftStore";
import { Container } from "flux/utils";
import CardActionCreators from "../actions/CardActionCreators";

class NewCard extends Component {
  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }
  handleSubmit(e) {
    e.preventDefault();
    CardActionCreators.addCard(this.state.draft);
    this.props.history.push("/");
  }
  handleClose(e) {
    this.props.history.push("/");
  }

  componentDidMount() {
    setTimeout(() => CardActionCreators.createDraft(), 0);
  }
  render() {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel="Create Card"
        handleChange={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        handleClose={e => this.handleClose(e)}
      />
    );
  }
}

NewCard.getStores = () => [DraftStore];
NewCard.calculateState = prevState => ({
  draft: DraftStore.getState()
});
NewCard.propTypes = {
  cardCallbacks: PropTypes.object
};
export default Container.create(withRouter(NewCard));
