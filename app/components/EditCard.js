import React, { Component } from "react";
import CardForm from "./CardForm";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import CardStore from "../stores/CardStore";
import DraftStore from "../stores/DraftStore";
import { Container } from "flux/utils";
import CardActionCreators from "../actions/CardActionCreators";

class EditCard extends Component {
  componentDidMount() {
    setTimeout(
      () =>
        CardActionCreators.createDraft(
          CardStore.getCard(this.props.params.card_id)
        ),
      0
    );
  }

  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    CardActionCreators.updateCard(
      CardStore.getCard(parseInt(this.props.params.card_id)),
      this.state.draft
    );
    this.props.history.push("/");
  }

  handleClose(e) {
    this.props.history.push("/");
  }

  render() {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel="Edit Card"
        handleChange={(e, v) => this.handleChange(e, v)}
        handleSubmit={e => this.handleSubmit(e)}
        handleClose={e => this.handleClose(e)}
      />
    );
  }
}
EditCard.getStores = () => [DraftStore];
EditCard.calculateState = prevState => ({
  draft: DraftStore.getState()
});
EditCard.propTypes = {
  cardCallbacks: PropTypes.object
};
export default Container.create(withRouter(EditCard));
