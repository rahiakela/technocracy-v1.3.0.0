import {blogAdapter, State} from './blog-state';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Blog} from '../../shared/models/blog-model';

// Returns the error state.
export const getError = (state: State): any => state.error;

// Returns the blog loading state.
export const getIsLoading = (state: State): boolean => state.isLoading;

// Returns the blog loaded state.
export const getIsLoaded = (state: State): boolean => state.loaded;

// Returns the selected blog id state.
export const getSelectedBlogId  = (state: State): string => state.selectedBlogId;

// Returns the blog list written by author state.
export const getBlogList  = (state: State): Blog[] => state.blogList;

// Returns the pending blog list state.
export const getPendingBlogList  = (state: State): Blog[] => state.pendingBlogList;

// Returns the related blog list state.
export const getRelatedBlogList  = (state: State): Blog[] => state.relatedBlogList;

// Returns the blog state.
const selectBlogState: MemoizedSelector<object, State> = createFeatureSelector('blog');

// select the array of blog ids
export const selectBlogIds = blogAdapter.getSelectors(selectBlogState).selectIds;

// select the dictionary of blog entities
export const selectBlogEntities = blogAdapter.getSelectors(selectBlogState).selectEntities;

// select the array of blog
export const selectAllBlog: (state: object) => Blog[] = blogAdapter.getSelectors(selectBlogState).selectAll;
// export const selectBlogList: (state: object) => Blog[] = blogAdapter.getSelectors(selectBlogState).selectAll;

// select the total blog count
export const selectBlogTotal = blogAdapter.getSelectors(selectBlogState).selectTotal;

// Returns the current selected blog id
export const selectCurrentBlogId = createSelector(selectBlogState, getSelectedBlogId);

// Returns the current selected blog based on blog id
export const selectBlogById = createSelector(
  selectBlogEntities,
  selectCurrentBlogId,
  (blogEntities, blogId) => blogEntities[blogId]
);

// Returns the blog error.
export const selectBlogError: MemoizedSelector<object, any> = createSelector(selectBlogState, getError);

// Returns true if the blog request is loading.
export const selectBlogIsLoading: MemoizedSelector<object, boolean> = createSelector(selectBlogState, getIsLoading);

// Returns true if the blog request is loaded.
export const selectBlogIsLoaded: MemoizedSelector<object, boolean> = createSelector(selectBlogState, getIsLoaded);

// Returns the blog list written by author.
export const selectBlogListWrittenByAuthor: MemoizedSelector<object, Blog[]> = createSelector(selectBlogState, getBlogList);

// Returns the pending blog list.
export const selectPendingBlogList: MemoizedSelector<object, Blog[]> = createSelector(selectBlogState, getPendingBlogList);

// Returns the related blog list.
export const selectRelatedBlogList: MemoizedSelector<object, Blog[]> = createSelector(selectBlogState, getRelatedBlogList);
