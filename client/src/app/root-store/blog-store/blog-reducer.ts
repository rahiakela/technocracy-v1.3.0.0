import {blogAdapter, initialState, State} from './blog-state';
import {Actions, ActionTypes} from './blog-actions';

/**
 * The blog reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 * @response {State} state the transformed state
 */
export function blogReducer(state = initialState, action: Actions): State {

  switch (action.type) {

    case ActionTypes.LOAD_BLOG_LIST:
    case ActionTypes.SEARCH_BLOG:
    case ActionTypes.LIKE_BLOG:
    case ActionTypes.LIKE_COMMENT:
    case ActionTypes.LIKE_REPLY:
    case ActionTypes.ADD_COMMENT:
    case ActionTypes.ADD_REPLY:
    case ActionTypes.UPDATE_COMMENT:
    case ActionTypes.UPDATE_REPLY:
    case ActionTypes.DELETE_COMMENT:
    case ActionTypes.DELETE_REPLY: {
      return {...state, isLoading: true};
    }

    case ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR: {
      // clear previous blog list
      return {...state, isLoading: true, blogList: []};
    }

    case ActionTypes.LOAD_PENDING_BLOG_LIST: {
      // clear previous blog list
      return {...state, isLoading: true, pendingBlogList: []};
    }

    case ActionTypes.GET_RELATED_BLOG: {
      return {...state, isLoading: true, relatedBlogList: []};
    }

    // Load blog reducer
    case ActionTypes.LOAD_BLOG: {
      return {
        ...state,
        selectedBlogId: action.payload.blogId,
        isLoading: true
      };
    }
    // Add and edit blog reducer
    case ActionTypes.ADD_BLOG:
    case ActionTypes.MODIFY_BLOG:
    case ActionTypes.EDIT_BLOG:
    case ActionTypes.REMOVE_BLOG: {
      return {
        ...state,
        isLoading: true,
        loaded: false
      };
    }

    case ActionTypes.LOAD_BLOG_LIST_SUCCESS:  {
      return blogAdapter.addAll(action.payload.blogs, {...state, isLoading: false});
    }

    case ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR_SUCCESS: {
      return {
        ...state,
        blogList: Object.assign({}, state.blogList, action.payload.blogs),
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.LOAD_PENDING_BLOG_LIST_SUCCESS: {
      return {
        ...state,
        pendingBlogList: Object.assign({}, state.pendingBlogList, action.payload.blogs),
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.LOAD_BLOG_SUCCESS: {
      return {...state, isLoading: false};
    }

    case ActionTypes.ADD_BLOG_SUCCESS: {
      const blogList = Object.assign(state.blogList, action.payload.blog);
      return {
        ...state,
        blogList: blogList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.EDIT_BLOG_SUCCESS:  {
      const updatedBlogList = Object.values(state.blogList)
        .map(blog => {
          if (blog._id === action.payload.blog._id) {
            return blog = action.payload.blog;
          }
          return blog;
        });

      return {
        ...state,
        blogList: updatedBlogList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.MODIFY_BLOG_SUCCESS: {
      const updatedBlogList = Object.values(state.blogList)
        .map(blog => {
          if (blog._id === action.payload.blog._id) {
            return blog = action.payload.blog;
          }
          return blog;
        });

      // filtering pending blog list for pending status only
      const updatedPendingBlogList = Object.values(state.pendingBlogList)
        .filter(blog => blog._id !== action.payload.blog._id);

      return {
        ...state,
        blogList: updatedBlogList,
        pendingBlogList: updatedPendingBlogList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.REMOVE_BLOG_SUCCESS:  {

      const updatedBlogList = Object.values(state.blogList)
        .filter(blog => blog._id !== action.payload.blog._id);

      return {
        ...state,
        blogList: updatedBlogList,
        isLoading: false,
        loaded: true
      };
    }

    case ActionTypes.SEARCH_BLOG_SUCCESS:  {
      return blogAdapter.addAll(action.payload.filteredBlogs, {...state, isLoading: false});
    }

    case ActionTypes.GET_RELATED_BLOG_SUCCESS: {
      return blogAdapter.addAll(action.payload.predictedBlogs,
        {...state, relatedBlogList: action.payload.predictedBlogs , isLoading: false}
        );
    }

    case ActionTypes.LIKE_BLOG_SUCCESS:
    case ActionTypes.ADD_COMMENT_SUCCESS: {
      return {
        ...blogAdapter.upsertOne(action.payload.blog, state),
        isLoading: false
      };
    }

    case ActionTypes.LIKE_COMMENT_SUCCESS:
    case ActionTypes.ADD_REPLY_SUCCESS:
    case ActionTypes.UPDATE_COMMENT_SUCCESS: {
      const blogId = action.payload.blogId;
      const commentId = action.payload.comment._id;

      // filter original blog from state.entities
      const blogEntities = {...state.entities};
      const originalBlog = blogEntities[blogId];

      // removing old comment from comments array
      const filteredComments = originalBlog.comments.filter(comment => comment._id !== commentId);
      // Adding an item to the end of an filtered comments array
      const updatedComments = filteredComments.concat(action.payload.comment);
      // update blog entities with updated comments array
      const updatedBlogEntities = {
        ...state.entities[blogId], // copy original Blog from entities
        comments: updatedComments  // override entities[blogId].comments with comments array
      };

      return {
        ...blogAdapter.upsertOne(updatedBlogEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.LIKE_REPLY_SUCCESS: {
      const blogId = action.payload.blogId;
      const replyId = action.payload.reply._id;

      // filter original blog from state.entities
      const blogEntities = {...state.entities};
      const originalBlog = blogEntities[blogId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      const updatedComments = originalBlog.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.map(reply => ({
            ...reply, // copy original reply
            // override reply's like if it is updated one otherwise replace it with old reply's like
            likes: reply._id === replyId ? action.payload.reply.likes : reply.likes
          }))
        }));

      // update blog entities with updated comment's replies array
      const updatedBlogEntities = {
        ...state.entities[blogId], // copy original Blog from entities
        comments: updatedComments // override entities[blogId].comments[commentId] with updated comment's replies array
      };

      return {
        ...blogAdapter.upsertOne(updatedBlogEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.UPDATE_REPLY_SUCCESS: {
      const blogId = action.payload.blogId;
      const replyId = action.payload.reply._id;

      // filter original blog from state.entities
      const blogEntities = {...state.entities};
      const originalBlog = blogEntities[blogId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      const updatedComments = originalBlog.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.map(reply => ({
            ...reply, // copy original reply
            // override reply's content if it is updated one otherwise replace it with old reply's content
            content: reply._id === replyId ? action.payload.reply.content : reply.content
          }))
        }));

      // update blog entities with updated comment's replies array
      const updatedBlogEntities = {
        ...state.entities[blogId], // copy original Blog from entities
        comments: updatedComments // override entities[blogId].comments[commentId] with updated comment's replies array
      };

      return {
        ...blogAdapter.upsertOne(updatedBlogEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.DELETE_COMMENT_SUCCESS: {
      const blogId = action.payload.blogId;
      const commentId = action.payload.commentId;

      // filter original blog from state.entities
      const blogEntities = {...state.entities};
      const originalBlog = blogEntities[blogId];

      // removing old comment from comments array
      const filteredComments = originalBlog.comments.filter(comment => comment._id !== commentId);

      // update blog entities with deleted comments array
      const updatedBlogEntities = {
        ...state.entities[blogId], // copy original Blog from entities
        comments: filteredComments  // override entities[blogId].comments with deleted comments array
      };

      return {
        ...blogAdapter.upsertOne(updatedBlogEntities, state),
        isLoading: false
      };
    }

    case ActionTypes.DELETE_REPLY_SUCCESS: {
      const blogId = action.payload.blogId;
      const replyId = action.payload.replyId;

      // filter original blog from state.entities
      const blogEntities = {...state.entities};
      const originalBlog = blogEntities[blogId];

      // ref: https://stackoverflow.com/questions/45769580/how-to-update-nested-array-values-in-immutable-way-in-reactjs
      // removing old reply from comments array
      const updatedComments = originalBlog.comments
        .map(comment => ({
          ...comment, // copy original comment
          replies: comment.replies.filter(reply => reply._id !== replyId) // remove deleted reply from replies array
        }));

      // update blog entities with updated comment's replies array
      const updatedBlogEntities = {
        ...state.entities[blogId], // copy original Blog from entities
        comments: updatedComments // override entities[blogId].comments[commentId] with updated comment's replies array
      };

      return {
        ...blogAdapter.upsertOne(updatedBlogEntities, state),
        isLoading: false
      };
    }

    // Blog failure reducer
    case ActionTypes.LOAD_BLOG_LIST_FAILURE:
    case ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR_FAILURE:
    case ActionTypes.LOAD_PENDING_BLOG_LIST_FAILURE:
    case ActionTypes.LOAD_BLOG_FAILURE:
    case ActionTypes.ADD_BLOG_FAILURE:
    case ActionTypes.EDIT_BLOG_FAILURE:
    case ActionTypes.REMOVE_BLOG_FAILURE:
    case ActionTypes.SEARCH_BLOG_FAILURE:
    case ActionTypes.GET_RELATED_BLOG_FAILURE:
    case ActionTypes.LIKE_BLOG_FAILURE:
    case ActionTypes.LIKE_COMMENT_FAILURE:
    case ActionTypes.LIKE_REPLY_FAILURE:
    case ActionTypes.ADD_COMMENT_FAILURE:
    case ActionTypes.ADD_REPLY_FAILURE:
    case ActionTypes.UPDATE_COMMENT_FAILURE:
    case ActionTypes.UPDATE_REPLY_FAILURE:
    case ActionTypes.DELETE_COMMENT_FAILURE:
    case ActionTypes.DELETE_REPLY_FAILURE: {
      return {...state, isLoading: false, error: action.payload.error};
    }


    default: {
      return state;
    }
  }
}
