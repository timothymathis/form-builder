import {
  LOAD_ASSESSMENT_SUCCESS,
  LOAD_QUESTION_TYPES_SUCCESS,
  SET_ACTIVE_QUESTION,
  UPDATE_QUESTION,
  CHANGE_QUESTION_TYPE,
  ADD_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  LOAD_ACTION_HISTORY_SUCCESS,
  UNDO_LATEST_ACTION_SUCCESS
} from '../constants';

const initialState = {
  userId: '1',
  assessmentId: '5be468f79f7e2b096db35089',
  questions: [],
  questionTypes: [],
  activeQuestion: null,
  showQuestionSettings: true,
  actionHistory: []
};

export default function assessmentReducer(state = initialState, action) {
  const { type, payload } = action;
  let questionIndex = null;

  switch (type) {
    case LOAD_ASSESSMENT_SUCCESS:
      return {
        ...state,
        questions: payload.questions
      };

    case LOAD_QUESTION_TYPES_SUCCESS:
      return {
        ...state,
        questionTypes: payload
      };

    case SET_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: payload
      };

    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, payload]
      };

    case UPDATE_QUESTION:
      questionIndex = state.questions.findIndex(
        question => question._id === payload._id
      );

      return {
        ...state,
        questions: [
          ...state.questions.slice(0, questionIndex),
          payload,
          ...state.questions.slice(questionIndex + 1)
        ]
      };

    case CHANGE_QUESTION_TYPE:
      questionIndex = state.questions.findIndex(
        question => question.id === payload.question.id
      );

      return {
        ...state,
        questions: [
          ...state.questions.slice(0, questionIndex),
          { ...payload.question, type: payload.newType },
          ...state.questions.slice(questionIndex + 1)
        ]
      };

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(
          question => question._id !== payload._id
        )
      };

    case LOAD_ACTION_HISTORY_SUCCESS:
      return {
        ...state,
        actionHistory: payload
      };

    case UNDO_LATEST_ACTION_SUCCESS:
      return {
        ...state
      };

    default:
      return state;
  }
}
