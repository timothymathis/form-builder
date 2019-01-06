import {
  API_URL,
  LOAD_ASSESSMENT_SUCCESS,
  SET_ACTIVE_QUESTION,
  LOAD_QUESTION_TYPES_SUCCESS,
  ADD_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  LOAD_ACTION_HISTORY_SUCCESS,
  UNDO_LATEST_ACTION_SUCCESS
} from '../constants';

export const loadAssessment = assessmentId => {
  return dispatch => {
    fetch(`${API_URL}/assessment/${assessmentId}`)
      .then(results => results.json())
      .then(assessment => {
        dispatch(loadAssessentSuccessAction(assessment));
        dispatch(setActiveQuestionAction(assessment.questions[0]));
      });
  };
};

export const loadAssessentSuccessAction = assessment => ({
  type: LOAD_ASSESSMENT_SUCCESS,
  payload: assessment
});

export const loadQuestionTypes = () => {
  return dispatch => {
    fetch(`${API_URL}/questionType/`)
      .then(results => results.json())
      .then(questionTypes => {
        dispatch(loadQuestionTypesSuccessAction(questionTypes));
      });
  };
};

export const loadQuestionTypesSuccessAction = questionTypes => ({
  type: LOAD_QUESTION_TYPES_SUCCESS,
  payload: questionTypes
});

export const setActiveQuestionAction = question => ({
  type: SET_ACTIVE_QUESTION,
  payload: question
});

export const addQuestionAction = question => {
  return dispatch => {
    fetch(`${API_URL}/question`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
      .then(results => results.json())
      .then(addedQuestion => {
        dispatch(addQuestionSuccessAction(addedQuestion));
        dispatch(loadActionHistoryAction());
      });
  };
};

export const addQuestionSuccessAction = question => ({
  type: ADD_QUESTION_SUCCESS,
  payload: question
});

export const updateQuestionAction = question => {
  return dispatch => {
    fetch(`${API_URL}/question`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
      .then(results => results.json())
      .then(updatedQuestion => {
        dispatch(updateQuestionSuccessAction(updatedQuestion));
        dispatch(loadActionHistoryAction());
      });
  };
};

export const updateQuestionSuccessAction = question => ({
  type: UPDATE_QUESTION_SUCCESS,
  payload: question
});

export const deleteQuestionAction = question => {
  return dispatch => {
    fetch(`${API_URL}/question/${question._id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(deletedQuestion => {
        dispatch(deleteQuestionSuccessAction(deletedQuestion));
        dispatch(loadActionHistoryAction());
      });
  };
};

export const deleteQuestionSuccessAction = question => ({
  type: DELETE_QUESTION_SUCCESS,
  payload: question
});

export const loadActionHistoryAction = () => {
  return (dispatch, getState) => {
    const userId = getState().assessment.userId;
    fetch(`${API_URL}/action/${userId}`)
      .then(response => response.json())
      .then(actionHistory => {
        dispatch(loadActionHistorySuccessAction(actionHistory));
      });
  };
};

export const loadActionHistorySuccessAction = actionHistory => ({
  type: LOAD_ACTION_HISTORY_SUCCESS,
  payload: actionHistory
});

export const undoLatestActionAction = () => {
  return (dispatch, getState) => {
    const userId = getState().assessment.userId;
    fetch(`${API_URL}/action/undo/${userId}`)
      .then(response => response.json())
      .then(latestAction => {
        console.log(`latestAction`, latestAction);
        dispatch(undoLatestSuccessAction());
        dispatch(loadActionHistoryAction());
      });
  };
};

export const undoLatestSuccessAction = () => ({
  type: UNDO_LATEST_ACTION_SUCCESS,
  payload: null
});
