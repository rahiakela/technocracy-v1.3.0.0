import {questionAdapter, State} from './question-state';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Question} from '../../shared/models/question-model';

// Returns the error state.
export const getError = (state: State): any => state.error;

// Returns the question loading state.
export const getIsLoading = (state: State): boolean => state.isLoading;

// Returns the question loaded state.
export const getIsLoaded = (state: State): boolean => state.loaded;

// Returns the selected question id state.
export const getSelectedQuestionId  = (state: State): string => state.selectedQuestionId;

// Returns the question list written by author state.
export const getQuestionList  = (state: State): Question[] => state.questionList;

// Returns the pending question list state.
export const getPendingQuestionList  = (state: State): Question[] => state.pendingQuestionList;

// Returns the question state.
export const selectQuestionState: MemoizedSelector<object, State> = createFeatureSelector('question');

// select the array of question ids
export const selectQuestionIds = questionAdapter.getSelectors(selectQuestionState).selectIds;

// select the dictionary of question entities
export const selectQuestionEntities = questionAdapter.getSelectors(selectQuestionState).selectEntities;

// Returns the question list
export const selectQuestionList: (state: object) => Question[] = questionAdapter.getSelectors(selectQuestionState).selectAll;

// select the total question count
export const selectQuestionTotal = questionAdapter.getSelectors(selectQuestionState).selectTotal;

// Returns the current selected question id
export const selectCurrentQuestionId = createSelector(selectQuestionState, getSelectedQuestionId);

// Returns the current selected question based on question id
export const selectQuestionById = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (questionEntities, questionId) => questionEntities[questionId]
);

// Returns the question error.
export const selectQuestionError: MemoizedSelector<object, any> = createSelector(selectQuestionState, getError);

// Returns true if the question request is loading.
export const selectQuestionIsLoading: MemoizedSelector<object, boolean> = createSelector(selectQuestionState, getIsLoading);

// Returns true if the question request is loaded.
export const selectQuestionIsLoaded: MemoizedSelector<object, boolean> = createSelector(selectQuestionState, getIsLoaded);

// Returns the question list written by author.
export const selectQuestionListAskedByUser: MemoizedSelector<object, Question[]> = createSelector(selectQuestionState, getQuestionList);

// Returns the pending question list.
export const selectPendingQuestionList: MemoizedSelector<object, Question[]> = createSelector(selectQuestionState, getPendingQuestionList);
