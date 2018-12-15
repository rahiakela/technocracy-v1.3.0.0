import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Blog} from '../../shared/models/blog-model';

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const blogAdapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: blog => blog._id,
  sortComparer: (a: Blog, b: Blog): number => b.createdOn.toString().localeCompare(a.createdOn.toString())
});

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Blog> {
  selectedBlogId: string;
  blogList?: Blog[];
  pendingBlogList?: Blog[];
  relatedBlogList?: Blog[];
  isLoading?: boolean;
  loaded?: boolean;
  error?: any;
}

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = blogAdapter.getInitialState({
  selectedBlogId: null,
  blogList: [],
  pendingBlogList: [],
  relatedBlogList: [],
  isLoading: false,
  loaded: false,
  error: null
});
