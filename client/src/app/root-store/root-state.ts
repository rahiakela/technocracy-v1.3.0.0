import { BlogState } from './blog-store';
import { QuestionState } from './question-store';
import { AuthState } from './auth-store';

/**
 * We treat each reducer like a table in a database.
 * This means our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: AuthState.State;
  blog: BlogState.State;
  question: QuestionState.State;
}
