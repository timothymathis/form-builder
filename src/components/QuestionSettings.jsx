import React, { Component } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

class QuestionSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.question) {
      this.setState({ type: newProps.question.type });
    }
  }

  handleChangeType = event => {
    const questionCopy = { ...this.props.question };
    questionCopy.type = event.target.value;
    this.props.actions.updateQuestionAction(questionCopy);
    this.props.actions.setActiveQuestionAction(questionCopy);
  };
  handleChangeRequired = newValue => {};
  handleChangeDescriptionEnabled = newValue => {};
  handleDelete = () => {
    this.props.actions.deleteQuestionAction(this.props.question);
    this.props.actions.setActiveQuestionAction(null);
  };
  render() {
    const { question, questionTypes } = this.props;

    if (question) {
      return (
        <article>
          <h2>Question {question.order}</h2>
          <div>
            <button>Move Up</button>
            <button>Move Down</button>
            <button>X</button>
          </div>
          <div>
            <button>Clone</button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
          <div>
            <select value={this.state.type} onChange={this.handleChangeType}>
              {questionTypes.map((questionType, index) => (
                <option key={index} value={questionType.name}>
                  {questionType.displayText}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Required</label>
            <ToggleSwitch
              active={question.required}
              onChange={this.handleChangeRequired}
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <ToggleSwitch
              active={question.descriptionEnabled}
              onChange={() => {}}
            />
          </div>
        </article>
      );
    } else {
      return (
        <article>
          <h2>New Question</h2>
          <div>
            <button>X</button>
          </div>
          <div>
            {questionTypes.map((questionType, index) => (
              <button key={index}>{questionType.displayText}</button>
            ))}
          </div>
        </article>
      );
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(QuestionSettings);
