import {Application} from 'express';
import {QuestionController} from '../controllers/question-controller';
import {AuthToken} from '../auth/auth-token';

export class QuestionRoute {
    Q_BASE_URL = '/api/question';

    public questionController: QuestionController = new QuestionController();

    public routes(app: Application, authToken: AuthToken): void {
        // Question API URLs
        app.route(`${this.Q_BASE_URL}/:page`).get(this.questionController.getQuestions);
        app.route(`${this.Q_BASE_URL}/:questionId/load`).get(this.questionController.getQuestion);
        app.route(`${this.Q_BASE_URL}/all/:askedBy`).get(authToken.verifyToken, this.questionController.getQuestionsAskedByUser);
        app.route(`${this.Q_BASE_URL}/all/pending/list`).get(authToken.verifyToken, this.questionController.getAllPendingQuestions);
        app.route(`${this.Q_BASE_URL}/:askedBy/:actionType`).post(authToken.verifyToken, this.questionController.saveQuestion);
        app.route(`${this.Q_BASE_URL}/:questionId/:actionType`).put(authToken.verifyToken, this.questionController.modifyQuestion);
        app.route(`${this.Q_BASE_URL}/:questionId`).put(authToken.verifyToken, this.questionController.editQuestion)
            .delete(authToken.verifyToken, this.questionController.deleteQuestion);

        // Question API URLs for statistics
        app.route(`${this.Q_BASE_URL}/statistics/:askedBy`).get(authToken.verifyToken, this.questionController.getTotalQuestionStatistics);
        app.route(`${this.Q_BASE_URL}/statistics/pending/:askedBy`).get(authToken.verifyToken, this.questionController.getTotalPendingQuestionStatistics);

        // Question API URLs for like
        app.route(`${this.Q_BASE_URL}/:questionId/like/:likedBy`).get(authToken.verifyToken, this.questionController.saveQuestionLike);

        // Question API URLs for vote up and down
        app.route(`${this.Q_BASE_URL}/voteup/:questionId/:votedBy`).get(authToken.verifyToken, this.questionController.voteUp);
        app.route(`${this.Q_BASE_URL}/votedown/:questionId/:votedBy`).get(authToken.verifyToken, this.questionController.voteDown);
    }
}
