import {initialState, questionAdapter, State} from './question-state';
import {Actions, ActionTypes} from './question-actions';

/**
 * The question reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 * @response {State} state the transformed state
 */
export function questionReducer(state = initialState, action: Actions): State {

  switch (action.type) {

    // Load question list reducer
    case ActionTypes.LOAD_QUESTION_LIST:
    case ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER:
    case ActionTypes.PREVIEW_QUESTION:
    case ActionTypes.LIKE_QUESTION:
    case ActionTypes.LIKE_COMMENT:
    case ActionTypes.LIKE_REPLY:
    case ActionTypes.ADD_COMMENT:
    case ActionTypes.ADD_REPLY:
    case ActionTypes.UPDATE_COMMENT:
    case ActionTypes.UPDATE_REPLY:
    case ActionTypes.DELETE_COMMENT:
    case ActionTypes.DELETE_REPLY:  {
      return {...state, isLoading: true};
    }

    // Load question reducer
    case ActionTypes.LOAD_QUESTION: {
      return {
        ...state,
        selectedQuestionId: action.payload.questionId,
        isLoading: true,
        error: null
      };
    }

    // Add and edit question reducer
    case ActionTypes.ADD_QUESTION:
    case ActionTypes.MODIFY_QUESTION:
    case ActionTypes.EDIT_QUESTION:
    case ActionTypes.REMOVE_QUESTION: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case ActionTypes.LOAD_QUESTION_LIST_SUCCESS:  {
      return questionAdapter.addAll(action.payload.questions, {...state, isLoading: false, error: null});
    }

    // Load question reducer written by author
    case ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER: {
      // clear previous question list
      return {
        ...state,
        questionList: [],
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER_SUCCESS:  {
      return {
        ...state,
        questionList: Object.assign({}, state.questionList, action.payload.questions),
        isLoading: false,
        loaded: true
      };
    }

    // Load pending question list reducer
    case ActionTypes.LOAD_PENDING_QUESTION_LIST: {
      // clear previous question list
      return {
        ...state,
        pendingQuestionList: [],
        isLoading: true,
        error: null
      };
    }
    // Load pending question list reducer success
    case ActionTypes.LOAD_PENDING_QUESTION_LIST_SUCCESS: {
      return {
        ...state,
        pendingQuestionList: Object.assign({}, state.pendingQuestionList, action.payload.questions),
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.LOAD_QUESTION_SUCCESS: {
      return {...state, isLoading: false};
    }

    case ActionTypes.ADD_QUESTION_SUCCESS: {
      return {
        ...state,
        questionList: Object.assign({}, state.questionList, action.payload.question),
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.EDIT_QUESTION_SUCCESS: {
      const updatedQuestionList = Object.values(state.questionList)
        .map(question => {
          if (question._id === action.payload.question._id) {
            return question = action.payload.question;
          }
          return question;
        });

      return {
        ...state,
        questionList: updatedQuestionList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.MODIFY_QUESTION_SUCCESS: {

      const updatedQuestionList = Object.values(state.questionList)
        .map(question => {
          if (question._id === action.payload.question._id) {
            return question = action.payload.question;
          }
          return question;
        });

      const updatedPendingQuestionList = Object.values(state.pendingQuestionList)
        .filter(question => question._id !== action.payload.question._id);

      return {
        ...state,
        questionList: updatedQuestionList,
        pendingQuestionList: updatedPendingQuestionList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.REMOVE_QUESTION_SUCCESS: {
      const updatedQuestionList = Object.values(state.questionList)
        .filter(question => question._id !== action.payload.question._id);

      return {
        ...state,
        questionList: updatedQuestionList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.LIKE_QUESTION_SUCCESS:
    case ActionTypes.ADD_COMMENT_SUCCESS: {
      return {
        ...questionAdapter.upsertOne(action.payload.question, state),
        isLoading: false
      };
    }

    case ActionTypes.LIKE_COMMENT_SUCCESS:
    case ActionTypes.ADD_REPLY_SUCCESS:
    case ActionTypes.UPDATE_COMMENT_SUCCESS: {
      const questionId = action.payload.questionId;
      const commentId = action.payload.comment._id;

      // filter original question from state.entities
      const questionEntities = {...state.entities};
      const originalQuestion = questionEntities[questionId];

      // removing old comment from comments array
      const filteredComments = originalQuestion.comments.filter(comment => comment._id !== commentId);
      // Adding an item to the end of an filtered comments array
      const updatedComments = filteredComments.concat(action.payload.comment);
      // update question entities with updated comments array
      const updatedQuestionEntities = {
        ...state.entities[questionId], // copy original Question from entities
        comments: updatedComments  // override entities[questionId].comments with comments array
      };

      return {
        ...questionAdapter.upsertOne(updatedQuestionEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.LIKE_REPLY_SUCCESS: {
      const questionId = action.payload.questionId;
      const replyId = action.payload.reply._id;

      // filter original question from state.entities
      const questionEntities = {...state.entities};
      const originalQuestion = questionEntities[questionId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      const updatedComments = originalQuestion.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.map(reply => ({
            ...reply, // copy original reply
            // override reply's like if it is updated one otherwise replace it with old reply's like
            likes: reply._id === replyId ? action.payload.reply.likes : reply.likes
          }))
        }));

      // update question entities with updated comment's replies array
      const updatedQuestionEntities = {
        ...state.entities[questionId], // copy original Question from entities
        comments: updatedComments // override entities[questionId].comments[commentId] with updated comment's replies array
      };

      return {
        ...questionAdapter.upsertOne(updatedQuestionEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.UPDATE_REPLY_SUCCESS: {
      const questionId = action.payload.questionId;
      const replyId = action.payload.reply._id;

      // filter original question from state.entities
      const questionEntities = {...state.entities};
      const originalQuestion = questionEntities[questionId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      const updatedComments = originalQuestion.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.map(reply => ({
            ...reply, // copy original reply
            // override reply's content if it is updated one otherwise replace it with old reply's content
            content: reply._id === replyId ? action.payload.reply.content : reply.content
          }))
        }));

      // update question entities with updated comment's replies array
      const updatedQuestionEntities = {
        ...state.entities[questionId], // copy original Question from entities
        comments: updatedComments // override entities[questionId].comments[commentId] with updated comment's replies array
      };

      return {
        ...questionAdapter.upsertOne(updatedQuestionEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.DELETE_COMMENT_SUCCESS: {
      const questionId = action.payload.questionId;
      const commentId = action.payload.commentId;

      // filter original question from state.entities
      const questionEntities = {...state.entities};
      const originalQuestion = questionEntities[questionId];

      // removing old comment from comments array
      const filteredComments = originalQuestion.comments.filter(comment => comment._id !== commentId);

      // update question entities with deleted comments array
      const updatedQuestionEntities = {
        ...state.entities[questionId], // copy original Question from entities
        comments: filteredComments  // override entities[questionId].comments with deleted comments array
      };

      return {
        ...questionAdapter.upsertOne(updatedQuestionEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.DELETE_REPLY_SUCCESS: {
      const questionId = action.payload.questionId;
      const replyId = action.payload.replyId;

      // filter original question from state.entities
      const questionEntities = {...state.entities};
      const originalQuestion = questionEntities[questionId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      // removing old reply from comments array
      const updatedComments = originalQuestion.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.filter(reply => reply._id !== replyId) // remove deleted reply from replies array
        }));

      // update question entities with updated comment's replies array
      const updatedQuestionEntities = {
        ...state.entities[questionId], // copy original Question from entities
        comments: updatedComments // override entities[questionId].comments[commentId] with updated comment's replies array
      };

      return {
        ...questionAdapter.upsertOne(updatedQuestionEntities, state),
        isLoading: false
      };
    }

    // Question failure reducer
    case ActionTypes.LOAD_QUESTION_LIST_FAILURE:
    case ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER_FAILURE:
    case ActionTypes.LOAD_PENDING_QUESTION_LIST_FAILURE:
    case ActionTypes.LOAD_QUESTION_FAILURE:
    case ActionTypes.ADD_QUESTION_FAILURE:
    case ActionTypes.EDIT_QUESTION_FAILURE:
    case ActionTypes.REMOVE_QUESTION_FAILURE:
    case ActionTypes.LIKE_QUESTION_FAILURE:
    case ActionTypes.LIKE_COMMENT_FAILURE:
    case ActionTypes.LIKE_REPLY_FAILURE:
    case ActionTypes.ADD_COMMENT_FAILURE:
    case ActionTypes.ADD_REPLY_FAILURE:
    case ActionTypes.UPDATE_COMMENT_FAILURE:
    case ActionTypes.UPDATE_REPLY_FAILURE:
    case ActionTypes.DELETE_COMMENT_FAILURE:
    case ActionTypes.DELETE_REPLY_FAILURE:  {
      return {...state, isLoading: false, error: action.payload.error};
    }

    default: {
      return state;
    }
  }
}
