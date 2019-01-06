import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Header from '../components/Header';
import FormAssessmentBuilder from './FormAssessmentBuilder';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

class App extends Component {
  render() {
    const { actions, message } = this.props;

    return (
      <div className="container-fluid">
        <Header title="Form Builder" />

        <FormAssessmentBuilder assessmentId="5be468f79f7e2b096db35089" />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
