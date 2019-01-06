import React from 'react';
import { MULTIPLE_CHOICE } from '../constants';
import Question from './Question';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import AddQuestion from './AddQuestion';

export default function QuestionList({ assessmentId, questions }) {
  return (
    <article>
      {questions.map((question, index) => {
        const questionIndex = index + 1;
        switch (question.type) {
          case MULTIPLE_CHOICE:
            return (
              <MultipleChoiceQuestion
                key={index}
                index={questionIndex}
                question={question}
              />
            );
          default:
            return (
              <Question key={index} index={questionIndex} question={question} />
            );
        }
      })}
      <AddQuestion assessmentId={assessmentId} index={questions.length + 1} />
    </article>
  );
}
