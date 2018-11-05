import {NextFunction, Request, Response} from "express";
import {Comment, Reply} from "../models/comment.model";
import {User} from "../models/user.model";
import {Blog} from "../models/blog.model";
import {MailSender} from "../mail/mail.sender";
import {Question} from "../models/question.model";

/**
 * @class CommentController: Define blog or question's comment and its reply related operation like fetching/saving/updating comment and reply and its like related operation etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class CommentController {
    // mailSender: MailSender = new MailSender();

    /**
     * Save blog's comment against user id and blog id and send comment mail notification to the users who accept comment mail notification.
     * @response: return json of updated blog with newly added comment
     */
    public saveBlogComment(req: Request, res: Response, next: NextFunction) {
        const blogId=req.params['blogId'];
        const commentedBy=req.params['commentedBy'];
        const content=req.body.content;
        const notification = req.body.notification;

        let mailOptions = new Map<string, any>();
        let newComment = new Comment();

        //Validate that required fields have been supplied
        if(!blogId || !commentedBy || !content){
            CommentController.validationError(res, next, 'blogId', 'userId', 'content');
        }

        //load user instance from database
        User.findById(commentedBy)
            .then((user: any) => {
                mailOptions.set("user", user);
                //Create a new comment instance and set its properties
                const commentToSave = {
                    "content": content,
                    "commentedBy": user._id,
                    "notification": notification
                };

                //Save this comment to MongoDB
                Object.assign(newComment, commentToSave)
                    .save()
                    .then((comment: any) => {
                        mailOptions.set("comment", comment);

                        //update Blog with comment id
                        const commentId=[comment._id];
                        Blog.findOneAndUpdate(
                            {"_id": blogId},
                            {$push: {comments: {$each: commentId}}},
                            {new: true}
                        )
                            .populate("profile")  // load profile instance
                            .populate({
                                // populate User instance
                                path: 'comments',
                                populate: { path: 'commentedBy', component: 'User' },
                            })
                            .populate({
                                // populate Reply instance
                                path: 'comments',
                                populate: {
                                    path: 'replies',
                                    component: 'Reply',
                                    populate: {
                                        // populate user who has replied
                                        path: 'repliedBy',
                                        component: 'User',
                                    },
                                },
                            })
                            .then((updatedBlog: any) => {
                                mailOptions.set("blog", updatedBlog);
                                // send comment mail notification to the users who accept comment mail notification
                                // CommentController.sendBlogCommentNotification(blogId, mailOptions, next);
                                let recipientSet = new Set();
                                updatedBlog.comments.forEach(comment => {
                                    // filter the user who has accepted to mail notification
                                    if (comment.notification) {
                                        // don't send this notification to the user who is commenting
                                        if (comment.commentedBy._id.toString() !== mailOptions.get("user")._id.toString()) {
                                            // adding recipient to set for uniqueness so that the mail notification should be sent to every user only one time
                                            recipientSet.add(comment.commentedBy);
                                        }
                                    }
                                });
                                // now send mail notification to every user
                                recipientSet.forEach(recipient => {
                                    MailSender.sendMail("blog-comment", mailOptions.set("recipient", recipient));
                                });
                                // returns updated blog with comment list
                                res.json(updatedBlog);
                                next();
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     * Save question's comment against user id and question id and send comment mail notification to the users who accept comment mail notification.
     * @response: return json of updated question with newly added comment
     */
    public saveQuestionComment(req: Request, res: Response, next: NextFunction) {
        const questionId = req.params['questionId'];
        const commentedBy = req.params['commentedBy'];
        const content = req.body.content;
        const notification = req.body.notification;

        let mailOptions = new Map<string, any>();
        let newComment = new Comment();

        //Validate that required fields have been supplied
        if(!questionId || !commentedBy || !content){
            CommentController.validationError(res, next, 'question id, user id and comment');
        }

        //load user instance from database
        User.findById(commentedBy)
            .then((user) => {
                mailOptions.set("user", user);
                //Create a new comment instance and set its properties
                const commentToSave = {
                    "content": content,
                    "commentedBy": user._id,
                    "notification": notification
                };

                //Save this comment to MongoDB
                Object.assign(newComment, commentToSave)
                    .save()
                    .then((comment) => {
                        mailOptions.set("comment", comment);

                        //update question with comment id
                        const commentId=[comment._id];
                        Question.findOneAndUpdate(
                            {"_id":questionId},
                            {$push:{comments:{$each:commentId}}},
                            {new: true}
                        )
                            .populate("askedBy")   // load user instance
                            .populate({
                                // populate User instance
                                path: 'comments',
                                populate: { path: 'commentedBy', component: 'User' },
                            })
                            .populate({
                                // populate Reply instance
                                path: 'comments',
                                populate: {
                                    path: 'replies',
                                    component: 'Reply',
                                    populate: {
                                        // populate user who has replied
                                        path: 'repliedBy',
                                        component: 'User',
                                    },
                                },
                            })
                            .then((updatedQuestion: any) => {
                                // send comment mail notification to the users who accept comment mail notification
                                // CommentController.sendQuestionCommentNotification(questionId, mailOptions);
                                mailOptions.set("question", updatedQuestion);
                                let recipientSet = new Set();
                                updatedQuestion.comments.forEach(comment => {
                                    // filter the user who has accepted to mail notification
                                    if (comment.notification) {
                                        // don't send this notification to the user who is commenting
                                        if (comment.commentedBy != null && comment.commentedBy._id.toString() !== mailOptions.get("user")._id.toString()) {
                                            // adding recipient to set for uniqueness so that the mail notification should be sent to every user only one time
                                            recipientSet.add(comment.commentedBy);
                                        }
                                    }
                                });
                                // now send mail notification to every user
                                recipientSet.forEach(recipient => {
                                    MailSender.sendMail("question-comment", mailOptions.set("recipient", recipient));
                                });

                                // returns updated question with comment list
                                res.json(updatedQuestion);
                                next();
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     * Edit comment and reply against comment id, reply id and action type.
     * @response: return json of updated comment or reply
     */
    public editCommentAndReply(req: Request, res: Response, next: NextFunction) {
        // const commentId=req.params['commentId'];
        const actionId=req.params['actionId'];
        const actionType=req.body.actionType;
        const content = req.body.content;

        if(!actionId && !actionType && !content) {
            CommentController.validationError(res, next, 'comment or reply id', 'actionType', 'content');
        }

        if (actionType == "comment") {
            Comment.findOneAndUpdate(
                {_id: actionId},
                {content: content},
                {new: true}
            )
                .populate('commentedBy') // populate User instance who has commented
                .then((comment) => {
                    if (comment) {
                        res.json(comment);
                        next();
                    }
                })
                .catch(next);
        }

        if (actionType == "reply") {
            Reply.findOneAndUpdate(
                {_id: actionId},
                {content: content},
                {new: true}
            )
                .populate('repliedBy') // populate User instance who has replied
                .then((reply) => {
                    if (reply) {
                        res.json(reply);
                        next();
                    }
                })
                .catch(next);
        }
    }

    /**
     * Delete comment instance against comment id.
     * @response: return json of isDeleted boolean
     */
    public deleteComment(req: Request, res: Response, next: NextFunction) {
        const commentId= req.params['commentId'];

        //Validate that required fields
        if(!commentId){
            CommentController.validationError(res, next, 'comment id');
        }

        Comment.find({'_id': commentId})
            .remove()
            .then((data) => {
                res.json({"isDeleted": data.ok});
                next();
            })
            .catch(next);
    }

    /**
     * Save comment's reply against user id and comment id for blog or question and send mail notification to the users who replied to the comment.
     * @param(repliedFor): blog or question reply type needed to identify for mail notification
     * @param(repliedForId): blog or question id where comment belonged
     * @param(commentId): comment id for which need to save the reply
     * @param(repliedBy): user id who has replied
     * @response: return json of updated comment with newly added reply
     */
    public saveReply(req: Request, res: Response, next: NextFunction) {

        const repliedFor=req.body.repliedFor;
        const repliedForId=req.body.repliedForId;
        const commentId=req.body.commentId;
        const repliedBy=req.body.repliedBy;
        const content=req.body.content;

        let mailOptions = new Map<string, any>();
        let newReply = new Reply();

        //Validate that required fields have been supplied
        if(!commentId || !repliedBy || !content){
            CommentController.validationError(res, next, '[repliedFor, repliedForId, user id, comment id and reply content]');
        }

        //Create a new reply and set its properties
        const replyToSave = {
            "content": content,
            "repliedBy": repliedBy
        };

        //Save this reply to MongoDB
        Object.assign(newReply, replyToSave)
            .save()
            .then((reply: any) => {
                mailOptions.set("reply", reply);

                //update Comments with comment id
                const replyId=[reply._id];

                return replyId;
            })
            .then(replyId => {
                Comment.findOneAndUpdate(
                    {"_id": commentId},
                    {$push: {replies: {$each: replyId}}},
                    {new: true}
                )
                .populate('commentedBy') // populate User instance who has commented
                .populate({
                    // populate Replys instance
                    path: 'replies',
                    component: 'Reply',
                    populate: {
                        // populate user who has replied
                        path: 'repliedBy',
                        component: 'User',
                    },
                })
                .then((updatedComment: any) => {
                    mailOptions.set("comment", updatedComment);
                    // send comment's reply mail notification to the users who accept comment mail notification
                    repliedFor === "blog" ? CommentController.sendBlogCommentNotification(repliedForId, repliedBy, mailOptions) : CommentController.sendQuestionCommentNotification(repliedForId, mailOptions);
                    // return updated comment
                    res.json(updatedComment);
                    next();
                });
            })
            .catch(next);
    }

    /**
     * Delete comment's reply instance against reply id.
     * @response: return json of isDeleted boolean
     */
    public deleteReply(req: Request, res: Response, next: NextFunction) {
        let replyId= req.params['replyId'];

        //Validate that required fields
        if(!replyId){
            CommentController.validationError(res, next, 'reply id');
        }

        Reply.find({'_id': replyId})
            .remove()
            .then((data) => {
                res.json({"isDeleted": data.ok});
                next();
            })
            .catch(next);
    }

    /**
     * Save comment's like against user id and comment id.
     * @param(commentId): comment id for which need to save the like
     * @param(likedBy): user id who has liked
     * @response: return json of updated comment with newly added likes
     */
    public saveCommentLike(req: Request, res: Response, next: NextFunction) {
        const likedBy = req.params["likedBy"];
        const commentId = req.params["commentId"];

        //Validate that required fields have been supplied
        if(!likedBy && !commentId){
            CommentController.validationError(res, next, '[user id and comment id]');
        }

        //check if the user liked this comment earlier or not
        Comment.findById(commentId)
            .populate('commentedBy') // populate User instance who has commented
            .populate({
                // populate Replys instance
                path: 'replies',
                component: 'Reply',
                populate: {
                    // populate user who has replied
                    path: 'repliedBy',
                    component: 'User',
                },
            })
            .then((comment: any) => {
                const savedLikedByUser= comment.likes.filter(like => like === likedBy);
                //if user does not like this comment then update database otherwise not
                if (savedLikedByUser.length === 0){
                    Comment.findOneAndUpdate(
                        {"_id": commentId},
                        {$push: {likes: {$each: [likedBy]}}},
                        {new: true}
                        )
                        .populate('commentedBy') // populate User instance
                        .populate({
                            // populate Replys instance
                            path: 'replies',
                            component: 'Reply',
                            populate: {
                                // populate user who has replied
                                path: 'repliedBy',
                                component: 'User',
                            },
                        })
                        .then((updatedComment: any) => {
                            res.json(updatedComment);
                            next();
                        })
                        .catch(next);
                } else {
                    res.json(comment);
                    next();
                }
            })
            .catch(next);
    }

    /**
     * Save reply's like against user id and reply id.
     * @param(replyId): reply id for which need to save the like
     * @param(likedBy): user id who has liked
     * @response: return json of updated reply with newly added likes
     */
    public saveReplyLike(req: Request, res: Response, next: NextFunction) {
        const likedBy = req.params['likedBy'];
        const replyId=req.params['replyId'];

        //Validate that required fields have been supplied
        if(!likedBy && !replyId){
            CommentController.validationError(res, next, '[user id and reply id]');
        }

        //check if the user liked this blog earlier or not
        Reply.findById(replyId)
            .populate('repliedBy') // populate User instance who has replied
            .then((reply: any) => {
                const savedLikedBy= reply.likes.filter(like => like === likedBy);
                //if user does not like this blog then update database otherwise not
                if (savedLikedBy.length === 0){
                    Reply.findOneAndUpdate(
                        {"_id":replyId},
                        {$push:{likes:{$each:[likedBy]}}},
                        {new: true}
                        )
                        .populate('repliedBy') // populate User instance who has replied
                        .then((updatedReply: any) => {
                            res.json(updatedReply);
                            next();
                        })
                        .catch(next);
                } else {
                    res.json(reply);
                    next();
                }
            })
            .catch(next);
    }

    private static async sendBlogCommentNotification(blogId: string, repliedBy: string, mailOptions: Map<string, any>) {

        User.findOne({"_id": repliedBy})
            .then((user) => {
                mailOptions.set("user", user);
                //query only published blog in publishedOn descending order with pagination
                let blogQuery=Blog.find({"_id": blogId});
                blogQuery.populate("profile");  // load profile instance
                blogQuery.populate({           // populate User instance
                    path:"comments",
                    populate:{
                        path:"commentedBy",
                        component:"User",
                        distinct: true
                    }
                });
                blogQuery.exec()
                    .then((blog: any) => {
                        mailOptions.set("blog", blog);
                        let recipientSet = new Set();
                        blog[0].comments
                            .forEach(comment => {
                            // filter the user who has accepted to mail notification
                            if (comment.notification) {
                                // don't send this notification to the user who is commenting
                                if (comment.commentedBy._id.toString() !== mailOptions.get("user")._id.toString()) {
                                    // adding recipient to set for uniqueness so that the mail notification should be sent to every user only one time
                                    recipientSet.add(comment.commentedBy);
                                }
                            }
                        });
                        // now send mail notification to every user
                        recipientSet.forEach(recipient => {
                            MailSender.sendMail("blog-comment", mailOptions.set("recipient", recipient));
                        });
                    });
            });

    }

    private static sendQuestionCommentNotification(questionId: string, mailOptions: Map<string, any>) {
        //query only published question in publishedOn descending order with pagination
        const questionQuery=Question.find({"_id": questionId});
        questionQuery.where("status").equals("published");
        questionQuery.populate("user");   // load user instance
        questionQuery.populate({          // populate User instance who commented
            path:"comments",
            populate:{
                path:"commentedBy",
                component:"User",
                distinct: "_id"
            }
        });
        questionQuery.exec()
            .then((question: any) => {
                mailOptions.set("question", question);
                let recipientSet = new Set();
                question.comments.forEach(comment => {
                    // filter the user who has accepted to mail notification
                    if (comment.notification) {
                        // don't send this notification to the user who is commenting
                        if (comment.commentedBy != null && comment.commentedBy._id.toString() !== mailOptions.get("user")._id.toString()) {
                            // adding recipient to set for uniqueness so that the mail notification should be sent to every user only one time
                            recipientSet.add(comment.commentedBy);
                        }
                    }
                });
                // now send mail notification to every user
                recipientSet.forEach(recipient => {
                    MailSender.sendMail("question-comment", mailOptions.set("recipient", recipient));
                });
            });
    }

    private static validationError(res: Response, next: NextFunction, ...params: string[]) {
        res.json({
            statusCode: 400,
            message: `Fields ${params} must be required`,
        });
        next();
        return;
    }
}