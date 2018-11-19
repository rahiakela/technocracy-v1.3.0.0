import {NextFunction, Request, Response} from 'express';
import {Question} from "../models/question.model";
import {MailSender} from "../mail/mail.sender";
import {User} from "../models/user.model";

/**
 * @class QuestionController: Define question related operation like fetching/saving/updating question and question related statistics etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class QuestionController {

    // mailSender: MailSender = new MailSender();

    /**
     * Get the list of published question.
     * @response: return json Question[] array
     */
    public getQuestions(req: Request, res: Response, next: NextFunction) {
        // verify the id parameter exists
        const PAGE = 'page';
        if (req.params[PAGE] === undefined) {
            this.validationError(res, next, PAGE);
        }

        const pageNumber: number = req.params[PAGE];
        const pageCount = pageNumber > 0 ? pageNumber : 0;
        const perPage = 20;

        //query only published question in publishedOn descending order with pagination
        Question.find({})
            .where("status").equals("published")
            .limit(perPage)
            .skip(perPage * pageCount)
            .sort("-publishedOn")
            .populate("askedBy")   // populate user instance
            .populate({            // populate User instance who commented
                path:"comments",
                populate:{
                    path:"commentedBy",
                    component:"User"
                }
            })
            .populate({          // populate Replys instance
                path:"comments",
                populate:{
                    path:"replies",
                    component:"Reply",
                    populate:{               // populate user who has reply
                        path:"repliedBy",
                        component:"User"
                    }
                }
            })
            .exec()
            .then((questions) => {
                res.json(questions);
                next();
            })
            .catch(next);
    }

    /**
     * Get a published question using question id.
     * @response: return json question object
     */
    public getQuestion(req: Request, res: Response, next: NextFunction) {
        // Validate that required fields have been supplied
        const PARAM_ID = 'questionId';
        if (req.params[PARAM_ID] === undefined) {
            this.validationError(res, next, PARAM_ID);
        }

        // get question id from request
        const questionId = req.params[PARAM_ID];

        //query only published question
        Question.findById(questionId)
            .where("status").equals("published")
            .populate("askedBy")   // load user instance
            .populate({            // populate User instance who commented
                path:"comments",
                populate:{
                    path:"commentedBy",
                    component:"User"
                }
            })
            .populate({                  // populate Replys instance
                path:"comments",
                populate:{
                    path:"replies",
                    component:"Reply",
                    populate:{            // populate user who has reply
                        path:"repliedBy",
                        component:"User"
                    }
                }
            })
            .exec()
            .then((question) => {
                if (question === null) {
                    res.json({message: `The question does not exist for ${questionId}`});
                } else {
                    res.json(question);
                }
                next();
            })
            .catch(next);
    }

    /**
     * Get all questions asked by user using user id.
     * @response: return json question[] array
     */
    public getQuestionsAskedByUser(req: Request, res: Response, next: NextFunction) {
        // verify the profile id parameter exists
        const PARAM_ID = 'askedBy';
        if (req.params[PARAM_ID] === undefined) {
            this.validationError(res, next, PARAM_ID);
        }

        const askedBy = req.params[PARAM_ID];

        //query all questions based on user who asked
        Question.find({"askedBy": askedBy})
            .populate("askedBy") // populate user instance
            .exec()
            .then((questions) => {
                res.json(questions.map(question => question.toObject()));
                next();
            })
            .catch(next);
    }

    /**
     * Get all pending questions for review and approval by Admin.
     * @response: return json question[] array
     */
    public getAllPendingQuestions(req: Request, res: Response, next: NextFunction) {
        //query all pending question
        Question.find({"status": "pending"})
            .sort('-createdOn')
            .populate("askedBy")    // populate user instance
            .exec()
            .then((questions) => {
                res.json(questions);
                next();
            })
            .catch(next);
    }

    /**
     * Save question against user id and action type.
     * @response: return json of new saved question object
     */
    public saveQuestion(req: Request, res: Response, next: NextFunction) {
        const askedBy = req.params['askedBy'];
        const actionType = req.params['actionType'];
        const title = req.body.title;
        const content = req.body.content;
        const tags = req.body.tags;

        let newQuestion = new Question();
        const mailOptions = new Map<string, any>();
        let questionToSave = {};

        // Validate that required fields have been supplied
        if (!askedBy || !actionType || !title || !content) {
            this.validationError(res, next, askedBy, actionType, title, content);
        }

        // prepare status and date type accordingly to action type
        if (actionType === 'save') {
            questionToSave= {
                "title": title,
                "content": content,
                "status": "pending",
                "submittedOn": Date.now(),
                "tags": tags,
                "askedBy": askedBy
            };
        } else {
            questionToSave= {
                "title": title,
                "content": content,
                "status": "draft",
                "createdOn": Date.now(),
                "tags": tags,
                "askedBy": askedBy
            };
        }

        //Save this question to MongoDB
        Object.assign(newQuestion, questionToSave)
            .save()
            .then(question => {
                // populate user instance
                Question.findOne(question._id)
                    .populate("askedBy")
                    .exec()
                    .then(savedQuestion => {
                        mailOptions.set("question", savedQuestion);
                        // don't send mail if the question is saved just as draft
                        if (actionType === 'save') {
                            // send new question post mail notification to editors
                            MailSender.sendMail("save-question", mailOptions.set("recipient", process.env.ADMIN_MAIL_ID));
                        }
                        res.json(savedQuestion);
                        next();
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     * Modify question status against question id and action.
     * @response: return json of updated question object
     */
    public modifyQuestion(req: Request, res: Response, next: NextFunction) {
        const questionId=req.params['questionId'];
        const actionType = req.params['actionType'];

        let mailOptions = new Map<string, any>();
        let questionToUpdate = {};

        if(!questionId || !actionType) {
            this.validationError(res, next, questionId, actionType);
        }

        // prepare status and date type accordingly to action type
        switch (actionType) {
            case 'pending':
                questionToUpdate = {"status": "pending", "updatedOn": Date.now()};
                break;
            case 'on_hold':
                questionToUpdate = {"status": "on_hold", "holdOnDate": Date.now()};
                break;
            case 'rejected':
                questionToUpdate = {"status": "rejected", "rejectedOn": Date.now()};
                break;
            case 'published':
                questionToUpdate = {"status": "published", "publishedOn": Date.now()};
                break;
        }

        // find and update question with id and populate with user who asked it
        Question.findOneAndUpdate(
            {"_id": questionId},       // query criteria
            questionToUpdate,                   // data to update
            {new: true}   // options: return updated one
        )
        .populate("askedBy")
        .then((question: any) => {
            mailOptions.set("question", question);
            // send question mail notification to user/subscriber according to action type
            switch (actionType) {
                case 'published':
                    User.find({})
                        .where("subscription").equals("Y") // filter the user who has subscribed to mail notification
                        .exec()
                        .then(users => {
                            users.forEach(user => {
                                // don't send this notification to the user who has asked the question
                                if(user._id.toString() !== question.askedBy._id.toString()) {
                                    MailSender.sendMail("publish-question", mailOptions.set("recipient", user));
                                }
                            });
                        })
                        .catch(next);
                    break;
                case 'pending':
                    // send new question post mail notification to editors
                    MailSender.sendMail("post-question", mailOptions.set("recipient", process.env.ADMIN_MAIL_ID));
                    break;
                case 'on_hold':
                    MailSender.sendMail("on-hold-question", mailOptions.set("recipient", question.askedBy));
                    break;
                case 'rejected':
                    MailSender.sendMail("rejected-question", mailOptions.set("recipient", question.askedBy));
                    break;
            }
            res.json(question);
            next();
        })
        .catch(next);
    }

    /**
     * Edit question against question id.
     * @response: return json of updated question object
     */
    public editQuestion(req: Request, res: Response, next: NextFunction) {
        const questionId=req.params['questionId'];
        const title = req.body.title;
        const content = req.body.content;
        const tags = req.body.tags;

        if(!questionId) {
            this.validationError(res, next, questionId);
        }

        Question.findOneAndUpdate(
            {"_id": questionId},   // query criteria
            {"title": title, "content": content, "tags": tags, status: "pending", "updatedOn": Date.now()}, // data to update
            { new: true}  // options: return updated one
            )
            .populate("askedBy")
            .exec()
            .then(question => {
                res.json(question);
                next();
            })
            .catch(next);
    }

    /**
     * Discard question against question id and make status 'inactive'.
     * @response: return json of updated question object
     */
    public deleteQuestion(req: Request, res: Response, next: NextFunction) {
        const questionId: string = req.params['questionId'];

        // Validate that required fields have been supplied
        if (!questionId) {
            this.validationError(res, next, questionId);
        }

        Question.findOneAndUpdate(
            {"_id": questionId}, // query criteria
            {"status": "inactive", "inactiveDate": Date.now()}, // update data
            { new: true }   // options: return updated one
            )
            .then((question) => {
                if (question) {
                    res.json(question);
                }
                next();
            })
            .catch(next);
    }

    /**
     * Get total question asked by user against user id for statistics.
     * @response: return json of total question count
     */
    public getTotalQuestionStatistics(req: Request, res: Response, next: NextFunction) {
        let askedBy=req.params['askedBy'];

        //get count of all question based on profile id
        Question.count({"askedBy": askedBy})
            .exec()
            .then((questionCount) => {
                // send question statistics as response
                res.json({totalQuestion: questionCount})
                next();
            })
            .catch(next);
    }

    /**
     * Get total pending question asked by user against user id for statistics.
     * @response: return json of total pending question count
     */
    public getTotalPendingQuestionStatistics(req: Request, res: Response, next: NextFunction) {
        //get count of all pending question
        Question.count({"status": "pending"})
            .exec()
            .then((questionPendingCount) => {
                // send question statistics as response
                res.json({totalPendingQuestion: questionPendingCount});
                next();
            })
            .catch(next);
    }

    /**
     * Save question's like against user id and question id.
     * @response: return json of updated question object
     */
    public saveQuestionLike(req: Request, res: Response, next: NextFunction) {
        const likedBy=req.params['likedBy'];
        const questionId=req.params['questionId'];

        //Validate that required fields have been supplied
        if(!questionId && !likedBy){
            this.validationError(res, next, questionId, likedBy);
        }

        //check if the user liked this question earlier or not
        Question.findById({'_id': questionId})
            .then((question: any) => {
                console.log('test');
                const savedLikedByUser= question.likes.filter(like => like === likedBy);

                //if user does not like this question then update database otherwise not
                if (savedLikedByUser.length === 0){
                    Question.findOneAndUpdate(
                        {"_id":questionId}, // query criteria
                        {$push:{likes:{$each:[likedBy]}}}, // data to update
                        {new: true} // options: return updated one
                    )
                    .populate("askedBy")   // load user instance
                    .populate({            // populate User instance who commented
                        path:"comments",
                        populate:{
                            path:"commentedBy",
                            component:"User"
                        }
                    })
                    .populate({                  // populate replies instance
                        path:"comments",
                        populate:{
                            path:"replies",
                            component:"Reply",
                            populate:{            // populate user who has reply
                                path:"repliedBy",
                                component:"User"
                            }
                        }
                    })
                    .then((question) => {
                        // return updated question
                        res.json(question);
                        next();
                    })
                    .catch(next);
                }else{
                    // return un-updated question
                    res.json(question);
                    next();
                }
            })
            .catch(next);
    }

    /**
     * Save question's vote up against user id and question id.
     * @response: return json of updated question object
     */
    public voteUp(req: Request, res: Response, next: NextFunction) {
        const votedBy=req.params['votedBy'];
        const questionId=req.params['questionId'];

        //Validate that required fields have been supplied
        if(!questionId && !votedBy){
            this.validationError(res, next, questionId, votedBy);
        }

        //check if the user vote up this question earlier or not
        Question.findById(questionId)
            .then((question: any) => {
                const savedVotedUpByUser= question[0].voteUp.filter(votedUpBy => votedUpBy === votedBy);
                //if user does not vote up this question then update database otherwise not
                if (savedVotedUpByUser.length === 0){
                    Question.update({"_id":questionId},{$push:{voteUp:{$each:[votedBy]}}},{})
                        .then(() => this.getQuestion(req, res, next))
                        .catch(next);
                }else{
                    // load updated question
                    this.getQuestion(req, res, next);
                }
            })
            .catch(next);
    }

    /**
     * Save question's vote down against user id and question id.
     * @response: return json of updated question object
     */
    public voteDown(req: Request, res: Response, next: NextFunction) {
        const votedBy=req.params['votedBy'];
        const questionId=req.params['questionId'];

        //Validate that required fields have been supplied
        if(!questionId && !votedBy){
            this.validationError(res, next, questionId, votedBy);
        }

        //check if the user voted down this question earlier or not
        Question.findById(questionId)
            .then((question: any) => {
                const savedVoteDownByUser= question[0].voteDown.filter(voteDownBy => voteDownBy === votedBy);
                //if user does not vote down this question then update database otherwise not
                if (savedVoteDownByUser.length === 0){
                    Question.update({"_id":questionId},{$push:{voteDown:{$each:[votedBy]}}},{})
                        .then(() => this.getQuestion(req, res, next))
                        .catch(next);
                }else{
                    // load updated question
                    this.getQuestion(req, res, next);
                }
            })
            .catch(next);
    }

    private notFoundError(res: Response, next: NextFunction) {
        res.sendStatus(404);
        next();
        return;
    }

    private validationError(res: Response, next: NextFunction, ...params: string[]) {
        res.json({
            statusCode: 400,
            message: `Fields ${params} must be required`,
        });
        next();
        return;
    }
}