import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Question} from '../../shared/models/question-model';

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: question => question._id,
  sortComparer: (a: Question, b: Question): number => b.createdOn.toString().localeCompare(a.createdOn.toString())
});

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Question>{
  selectedQuestionId: string;
  questionList?: Question[];
  pendingQuestionList?: Question[];
  isLoading?: boolean;
  loaded?: boolean;
  error?: any;

}

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = questionAdapter.getInitialState({
  selectedQuestionId: null,
  questionList: [],
  pendingQuestionList: [],
  isLoading: false,
  loaded: false,
  error: null
});
