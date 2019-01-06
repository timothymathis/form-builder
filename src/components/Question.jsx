import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

class Question extends Component {
  handleClick = () => {
    this.props.actions.setActiveQuestionAction(this.props.question);
  };
  render() {
    const { actions, index, question, children } = this.props;
    return (
      <section onClick={this.handleClick}>
        <div>{index}</div>
        <div>
          <p>{question.text}</p>
          {question.descriptionEnabled && (
            <input type="text" placeholder="Write your description here" />
          )}
        </div>
        <div>{children}</div>
      </section>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Question);
