import React, { Component } from 'react';
import Question from './Question';

export default class MultipleChoiceQuestion extends Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <Question {...this.props}>
          <ul>
            {question.choices &&
              question.choices.map((choice, index) => (
                <li key={index}>{choice.text}</li>
              ))}
            <li>
              <form>
                <input type="text" placeholder="choice" />
              </form>
            </li>
          </ul>
        </Question>
      </div>
    );
  }
}
