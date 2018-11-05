import {createSelector, MemoizedSelector} from '@ngrx/store';
import {BlogSelectors} from './blog-store';

// root state level selectors, such as a Loading property, or even an aggregate Error property

export const selectError: MemoizedSelector<object, string> = createSelector(
  BlogSelectors.selectBlogError,
  (blogError: string) => {
    return blogError;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  BlogSelectors.selectBlogIsLoading,
  (blogIsLoding: boolean) => {
    return blogIsLoding;
  }
);
