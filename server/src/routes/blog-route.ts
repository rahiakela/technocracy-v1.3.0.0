import {Application} from 'express';
import {BlogController} from '../controllers/blog.controller';
import {AuthToken} from "../auth/auth-token";

export class BlogRoute {
    BLOG_BASE_URL = '/api/blog';

    public blogController: BlogController = new BlogController();

    public routes(app: Application, authToken: AuthToken): void {

        // Blog API URLs
        app.route(`${this.BLOG_BASE_URL}/:page`).get(this.blogController.getBlogs);
        app.route(`${this.BLOG_BASE_URL}/:blogId/load`).get(this.blogController.getBlog);
        app.route(`${this.BLOG_BASE_URL}/search/:query`).get(this.blogController.searchBlog);
        app.route(`${this.BLOG_BASE_URL}/all/:writtenBy`).get(authToken.verifyToken, this.blogController.getBlogListWrittenByAuthor);
        app.route(`${this.BLOG_BASE_URL}/all/pending/list`).get(authToken.verifyToken, this.blogController.getAllPendingBlogs);
        app.route(`${this.BLOG_BASE_URL}/:profileId/:actionType`).post(authToken.verifyToken, this.blogController.saveBlog);
        app.route(`${this.BLOG_BASE_URL}/:blogId/:actionType`).put(authToken.verifyToken, this.blogController.modifyBlog);
        app.route(`${this.BLOG_BASE_URL}/:blogId`).put(authToken.verifyToken, this.blogController.editBlog)
            .delete(authToken.verifyToken, this.blogController.deleteBlog);

        // Blog API URLs for statistics
        app.route(`${this.BLOG_BASE_URL}/statistics/:writtenBy`).get(authToken.verifyToken, this.blogController.getTotalBlogStatistics);
        app.route(`${this.BLOG_BASE_URL}/statistics/pending/:writtenBy`).get(authToken.verifyToken, this.blogController.getTotalPendingBlogStatistics);

        // Blog API URLs for like
        app.route(`${this.BLOG_BASE_URL}/:blogId/like/:likedBy`).get(authToken.verifyToken, this.blogController.saveBlogLike);

    }
}
