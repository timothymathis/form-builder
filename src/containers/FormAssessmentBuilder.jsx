import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import QuestionSettings from '../components/QuestionSettings';
import QuestionList from '../components/QuestionList';
import History from '../components/History';

const mapStateToProps = state => ({
  assessmentId: state.assessment.assessmentId,
  questionTypes: state.assessment.questionTypes,
  questions: state.assessment.questions,
  actionHistory: state.assessment.actionHistory,
  activeQuestion: state.assessment.activeQuestion,
  showQuestionSettings: state.assessment.showQuestionSettings
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

class FormAssessmentBuilder extends Component {
  componentDidMount() {
    this.props.actions.loadQuestionTypes();
    this.props.actions.loadAssessment(this.props.assessmentId);
    this.props.actions.loadActionHistoryAction();
  }
  render() {
    const {
      actions,
      assessmentId,
      questionTypes,
      questions,
      actionHistory,
      activeQuestion,
      showQuestionSettings
    } = this.props;

    return (
      <article className="container-fluid">
        <div className="row">
          {showQuestionSettings && (
            <section className="col-3">
              <QuestionSettings
                question={activeQuestion}
                questionTypes={questionTypes}
              />
            </section>
          )}
          <section className="col">
            {questions && (
              <QuestionList questions={questions} assessmentId={assessmentId} />
            )}
            {!questions && <div>Loading...</div>}
          </section>
          <section className="col-2">
            <History
              actionHistory={actionHistory}
              undoLatestAction={actions.undoLatestActionAction}
            />
          </section>
        </div>
      </article>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAssessmentBuilder);
