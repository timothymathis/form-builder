import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import {
  DEFAULT_QUESTION_TYPE,
  DEFAULT_QUESTION_REQUIRED,
  DEFAULT_QUESTION_DESCRIPTION_ENABLED,
  DEFAULT_QUESTION_DESCRIPTION
} from '../constants';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.addQuestionAction({
      assessment: this.props.assessmentId,
      type: DEFAULT_QUESTION_TYPE,
      required: DEFAULT_QUESTION_REQUIRED,
      descriptionEnabled: DEFAULT_QUESTION_DESCRIPTION_ENABLED,
      text: this.state.text,
      description: DEFAULT_QUESTION_DESCRIPTION,
      randomizeChoices: false,
      order: this.props.index
    });
    this.setState({
      text: ''
    });
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleFocus = () => {
    this.props.actions.setActiveQuestionAction(null);
  };

  render() {
    const { index } = this.props;
    return (
      <section>
        <div>{index}</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Type question here..."
              value={this.state.text}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </form>
        </div>
      </section>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddQuestion);
