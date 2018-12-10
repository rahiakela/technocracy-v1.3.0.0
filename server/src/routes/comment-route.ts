import {CommentController} from '../controllers/comment-controller';
import {Application} from 'express';
import {AuthToken} from '../auth/auth-token';

export class CommentRoute {
    COMMENT_BASE_URL = '/api/comment';

    public commentController: CommentController = new CommentController();

    public routes(app: Application, authToken: AuthToken): void {
        // API URLs for Blog or Question's comment
        app.route(`${this.COMMENT_BASE_URL}/blog/:blogId/:commentedBy`).post(authToken.verifyToken, this.commentController.saveBlogComment);
        app.route(`${this.COMMENT_BASE_URL}/question/:questionId/:commentedBy`).post(authToken.verifyToken, this.commentController.saveQuestionComment);

        // API URLs for Comment
        app.route(`${this.COMMENT_BASE_URL}/:actionId`).put(authToken.verifyToken, this.commentController.editCommentAndReply);
        app.route(`${this.COMMENT_BASE_URL}/:commentId`).delete(authToken.verifyToken, this.commentController.deleteComment);

        // API URLs for Comment's reply (add reply, delete reply)
        app.route(`${this.COMMENT_BASE_URL}/reply`).post(authToken.verifyToken, this.commentController.saveReply);
        app.route(`${this.COMMENT_BASE_URL}/reply/:replyId`).delete(authToken.verifyToken, this.commentController.deleteReply);

        // API URLs for Comment or Reply's like
        app.route(`${this.COMMENT_BASE_URL}/like/:commentId/:likedBy`).get(authToken.verifyToken, this.commentController.saveCommentLike);
        app.route(`${this.COMMENT_BASE_URL}/reply/like/:replyId/:likedBy`).get(authToken.verifyToken, this.commentController.saveReplyLike);
    }

}
