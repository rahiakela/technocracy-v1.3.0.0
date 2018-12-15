import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user.model';
import {Blog} from '../models/blog.model';
import {Reply} from '../models/comment.model';
import {MailSender} from '../mail/mail.sender';

// load classifier and model
const BayesClassifier = require('bayes-classifier');
const classifierModel = '../../blog-classifier-model.json';

/**
 * @class BlogController: Define blog related operation like fetching/saving/updating blog and blog related statistics etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class BlogController {
  // mailSender: MailSender = new MailSender();

  /**
   * Get the list of published blog.
   * @response: return json Blog[] array
   */
  public getBlogs(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PAGE = 'page';
    if (req.params[PAGE] === undefined) {
      BlogController.notFoundError(res, next);
    }

    const pageNumber: number = req.params[PAGE];
    const pageCount = pageNumber > 0 ? pageNumber : 0;
    const perPage = 100;

    // query only published blog in publishedOn descending order with pagination
    Blog.find({})
      .where('status').equals('published')
      .limit(perPage)
      // .skip(perPage * pageCount)
      .sort('-publishedOn')
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: { path: 'user', component: 'User' }
      })
      .populate({
        // populate User instance who commented
        path: 'comments',
        populate: { path: 'commentedBy', component: 'User' },
      })
      .populate({
        // populate Replys instance
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
      .exec()
      .then(blogs => {
        res.json(blogs);
        next();
      })
      .catch(next);
  }

  /**
   * Get a published blog using blog id.
   * @response: return json Blog object
   */
  public getBlog(req: Request, res: Response, next: NextFunction) {
    // Validate that required fields have been supplied
    const PARAM_ID = 'blogId';
    if (req.params[PARAM_ID] === undefined) {
      BlogController.notFoundError(res, next);
    }

    // get blog id from request
    const blogId = req.params[PARAM_ID];

    // query only published blog
    Blog.findById(blogId)
      .where('status')
      .equals('published')
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: { path: 'user', component: 'User' },
      })
      .populate({
        // populate User instance
        path: 'comments',
        populate: { path: 'commentedBy', component: 'User' },
      })
      .populate({
        // populate Replys instance
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
      .exec()
      .then(blog => {
        // verify blog was found
        if (blog === null) {
          BlogController.notFoundError(res, next);
        }
        // send json of blog object
        res.json(blog);
        next();
      })
      .catch(next);
  }

  /**
   * Get all blog written by author using profile id.
   * @response: return json Blog[] array
   */
  public getBlogListWrittenByAuthor(req: Request, res: Response, next: NextFunction) {
    // verify the profile id parameter exists
    const PARAM_ID = 'writtenBy';
    if (req.params[PARAM_ID] === undefined) {
      BlogController.validationError(res, next, PARAM_ID);
    }

    const writtenBy = req.params[PARAM_ID];
    // query all blog of author based on profile id
    Blog.find({ profile: writtenBy })
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: { path: 'user', component: 'User' },
      })
      .exec()
      .then(blogs => {
        res.json(blogs.map(blog => blog.toObject()));
        next();
      })
      .catch(next);
  }

  /**
   * Get all pending blog for review and approval by Admin.
   * @response: return json Blog[] array
   */
  public getAllPendingBlogs(req: Request, res: Response, next: NextFunction) {

    // query all pending blog
      Blog.find({})
      .where('status').equals('pending')
      .sort('-createdOn')
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: { path: 'user', component: 'User' }
      })
      .exec()
      .then(blogs => {
        res.json(blogs);
        next();
      })
      .catch(next);
  }

  /**
   * Save blog against profile id and action type.
   * @response: return json of new saved blog object
   */
  public saveBlog(req: Request, res: Response, next: NextFunction) {
      const profileId: string = req.params['profileId'];
      const action: string = req.params['actionType'];
      const title: string = req.body.title;
      const content: string = req.body.content;
      const tags: string[] = req.body.tags;

      const mailOptions = new Map<string, any>();
      const newBlog = new Blog();
      let blogToSave = {};

      // Validate that required fields have been supplied
      if (!profileId || !title || !content) {
          BlogController.validationError(res, next, profileId, title, content);
      }

      // prepare status and date type accordingly to action type
      if (action === 'post') {
          // Create a new blog instance and set its properties
          blogToSave = {
              title: title,
              content: content,
              status: 'pending',
              submittedOn: Date.now(),
              tags: tags,
              profile: profileId,
          };
      } else {
          blogToSave = {
              title: title,
              content: content,
              status: 'draft',
              createdOn: Date.now(),
              tags: tags,
              profile: profileId,
          };
      }

      // Save this blog to MongoDB
      Object.assign(newBlog, blogToSave)
          .save()
          .then(blog => {
              // populate user with profile and user instance
              Blog.findById(blog._id)
                  .populate({
                      path: 'profile',
                      populate: {
                          path: 'user',
                          component: 'User',
                      },
                  })
                  .exec()
                  .then(savedBlog => {
                      // don't send mail if the blog is saved just as draft
                      if (action === 'post') {
                          mailOptions.set('blog', savedBlog);
                          // send new blog post mail notification to editors
                          MailSender.sendMail('post-blog', mailOptions.set('recipient', process.env.ADMIN_MAIL_ID));
                      }
                      res.json(savedBlog);
                      next();
                  })
                  .catch(next);
          })
          .catch(next);
  }

  /**
   * Modify blog status against blog id and action.
   * @response: return json of updated Blog object
   */
  public modifyBlog(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params['blogId'];
    const actionType = req.params['actionType'];

    const mailOptions = new Map<string, any>();
    let blogToUpdate = {};

    if (!blogId && !actionType) {
      BlogController.validationError(res, next, blogId, actionType);
    }

    // prepare status and date type accordingly to action type
    switch (actionType) {
      case 'pending':
        blogToUpdate = { status: 'pending', updatedOn: Date.now() };
        break;
      case 'on_hold':
        blogToUpdate = { status: 'on_hold', holdOnDate: Date.now() };
        break;
      case 'rejected':
        blogToUpdate = { status: 'rejected', rejectedOn: Date.now() };
        break;
      case 'published':
        blogToUpdate = { status: 'published', publishedOn: Date.now() };
        break;
    }

    // find and update blog with id and populate with profile
    Blog.findOneAndUpdate(
      {
        _id: blogId, // query criteria
      },
      blogToUpdate, // data to update
      {
        new: true, // options: return updated one
      }
    )
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: { path: 'user', component: 'User' },
      })
      .then((blog: any) => {
        mailOptions.set('blog', blog);
        // send blog mail notification to user/subscriber according to action type
        switch (actionType) {
          case 'published':
            // filter the user who has subscribed to mail notification
            User.find({})
              .where('subscription')
              .equals('Y')
              .exec()
              .then(users => {
                users.forEach(user => {
                  if (user._id.toString() !== blog.toString()) {
                    // don't send this notification to the profile who has written this blog
                    MailSender.sendMail('publish-blog', mailOptions.set('recipient', user));
                  }
                });
              })
              .catch(next);
            break;
          case 'pending':
            // send new blog post mail notification to editors
            MailSender.sendMail('post-blog', mailOptions.set('recipient', process.env.ADMIN_MAIL_ID));
            break;
          case 'on_hold':
              // send blog on hold mail notification to author
            MailSender.sendMail('on-hold-blog', mailOptions.set('recipient', blog.profile.user));
            break;
          case 'rejected':
            // send blog reject mail notification to author
            MailSender.sendMail('rejected-blog', mailOptions.set('recipient', blog.profile.user));
            break;
        }

        res.json(blog);
        next();
      })
      .catch(next);
  }

  /**
   * Edit blog against blog id.
   * @response: return json of updated blog object
   */
  public editBlog(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params['blogId'];
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags;

    if (!blogId && !title && !content) {
      BlogController.validationError(res, next, blogId, title, content);
    }

    Blog.findOneAndUpdate(
      { _id: blogId }, // query criteria
      {
        title: title,
        content: content,
        tags: tags,
        status: 'draft',
        updatedOn: Date.now(),
      }, // data to update
      { new: true } // options: return updated one
    )
      .populate({
        // populate profile instance with user
        path: 'profile',
        populate: {
          path: 'user',
          component: 'User',
        },
      })
      .then(blog => {
        res.json(blog);
        next();
      })
      .catch(next);
  }

  /**
   * Delete blog against blog id and make status 'inactive'.
   * @response: return json of deleted blog object
   */
  public deleteBlog(req: Request, res: Response, next: NextFunction) {
    const blogId: string = req.params['blogId'];

    // Validate that required fields have been supplied
    if (!blogId) {
      BlogController.validationError(res, next, blogId);
    }

    Blog.findOneAndUpdate(
      { _id: blogId }, // query criteria
      { status: 'inactive', inactiveDate: Date.now() }, // update data
      { new: true } // options: return updated one
    )
      .then(blog => {
        res.json(blog);
        next();
      })
      .catch(next);
  }

  /**
   * Get total blog written by author against profile id for statistics.
   * @response: return json of total blog count
   */
  public getTotalBlogStatistics(req: Request, res: Response, next: NextFunction) {
    const writtenBy = req.params['writtenBy'];

    // get count of all blog based on profile id
    Blog.count({ profile: writtenBy })
      .exec()
      .then(blogCount => {
        // send blog statistics as response
        res.json({ totalBlog: blogCount });
        next();
      })
      .catch(next);
  }

  /**
   * Get total pending blog written by author against profile id for statistics.
   * @response: return json of total pending blog count
   */
  public getTotalPendingBlogStatistics(req: Request, res: Response, next: NextFunction) {
    // get count of all pending blog
    Blog.count({ status: 'pending' })
      .exec()
      .then(blogPendingCount => {
        res.json({ totalPendingBlog: blogPendingCount });
        next();
      })
      .catch(next);
  }

  /**
   * Save blog's like against user id and blog id.
   * @response: return json blog object
   */
  public saveBlogLike(req: Request, res: Response, next: NextFunction) {
    const likedBy: string = req.params['likedBy'];
    const blogId: string = req.params['blogId'];

    // Validate that required fields have been supplied
    if (!blogId && !likedBy) {
      BlogController.validationError(res, next, blogId, likedBy);
    }

    Blog.findById(blogId)
        .then((blog: any) => {
          const savedLikedByUser = blog.likes.filter(like => like === likedBy);
          // if user does not like this blog then update user's like otherwise not
          if (savedLikedByUser.length === 0) {
              Blog.findOneAndUpdate(
                  { _id: blogId }, // query criteria
                  { $push: { likes: { $each: [likedBy] } } }, // data to update
                  { new: true } // options: return updated one
              )
                .populate({
                    // populate profile instance with user
                    path: 'profile',
                    populate: { path: 'user', component: 'User' },
                })
                .populate({
                    // populate User instance
                    path: 'comments',
                    populate: { path: 'commentedBy', component: 'User' },
                })
                .populate({
                    // populate Replys instance
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
                .then(savedBlog => {
                    res.json(savedBlog);
                    next();
                })
                .catch(next);
          } else {
              res.json(blog);
              next();
          }
        })
        .catch(next);

  }

  /**
   * Search blog against query term.
   * @response: return json blog array
   */
  public searchBlog(req: Request, res: Response, next: NextFunction) {
    const query = req.params['query'];

    // Validate that required fields have been supplied
    if (query.length < 1) {
      BlogController.validationError(res, next, query);
    }

    // query only published blog in publishedOn descending order with pagination
    BlogController.queryBlog(query, 100, res, next);
  }

  /**
  * Get related blog after classifying it using machine learning model by passing blog title and then query the classified term.
  * @response: return json blog array
  */
  public getRelatedBlog(req: Request, res: Response, next: NextFunction) {
      const title = req.body.title;

      // Validate that required fields have been supplied
      if (title.length < 1) {
          BlogController.validationError(res, next, title);
      }

      // restore classifier from model
      const blogClassifier = new BayesClassifier();
      const storedClassifier = require(classifierModel);
      blogClassifier.restore(storedClassifier);

      // predict the term by calling classify method of classifier
      const predictedTerm = blogClassifier.classify(title);

      // query related blog using predicted term
      BlogController.queryBlog(predictedTerm, 20, res, next);
  }

  // query only published blog in publishedOn descending order with pagination
  private static queryBlog(term: string, limit: number, res: Response, next: NextFunction) {

      Blog.find({ $text: { $search: term } })
          .where('status')
          .equals('published')
          .limit(limit)
          .skip(0)
          .sort('-publishedOn')
          .populate({
              // populate profile instance with profile
              path: 'profile',
              populate: {
                  path: 'user',
                  component: 'User',
              },
          })
          .populate({
              // populate comment list instance
              path: 'comments',
              populate: {
                  // populate User instance
                  path: 'commentedBy',
                  component: 'User',
              },
          })
          .populate({
              path: 'comments',
              populate: {
                  // populate Replys instance
                  path: 'replies',
                  component: 'Reply',
                  populate: {
                      // populate user who has reply
                      path: 'repliedBy',
                      component: 'User',
                  },
              },
          })
          .exec()
          .then(blogs => {
              res.json(blogs);
              // next();
          })
          .catch(next);
  }

  private static notFoundError(res: Response, next: NextFunction) {
    res.sendStatus(404);
    next();
    return;
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
