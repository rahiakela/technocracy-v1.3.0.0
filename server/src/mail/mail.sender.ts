import * as nodemailer from 'nodemailer';
import { BlogPublishMailTemplate } from './template/blog-publish-template';
import { CommentMailTemplate } from './template/comment-template';
import { MailActivateTemplate } from './template/mail-activate-template';
import { PasswordResetTemplate } from './template/password-reset-template';
import { ProdErrorTemplate } from './template/prod-error-template';
import { QuestionPostMailTemplate } from './template/question-post-template';
import { QuestionOnHoldMailTemplate } from './template/question-onhold-template';
import { QuestionRejectedMailTemplate } from './template/question-rejected-template';
import { QuestionPublishMailTemplate } from './template/question-publish-template';
import { SubscribedMailTemplate } from './template/subscribed-template';
import { WelcomeMailTemplate } from './template/welcome-template';
import {UserUtils} from "../utils/user-utils";
import {BlogSaveMailTemplate} from "./template/blog-save-template";
import {BlogOnHoldMailTemplate} from "./template/blog-onhold-template";
import {BlogRejectedMailTemplate} from "./template/blog-rejected-template";

export class MailSender {

  /**
   * Send mail notification to user based on mail type
   * @param recipient {any} The mail recipient to whom send mail notification.
   * @param mailOption {Map<string, any>} The map that contains user, profile, blog, question and comment object accordingly to mail type.
   * @response: return void
   * Reference:
   * 1-http://javascript.tutorialhorizon.com/2015/07/02/send-email-node-js-express/
   * 2-https://stackoverflow.com/questions/4113701/sending-emails-in-node-js
   * 3-https://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
   */
  public static sendMail(mailType: string, mailOption?: Map<string, any>) {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // use smtp host
      service: process.env.MAIL_SERVICE, // use mail service
      auth: {
        // use sender credentials
        user: process.env.ADMIN_MAIL_ID,
        pass: process.env.ADMIN_MAIL_SECRET,
      },
    });

    const recipient = mailOption.get('recipient');
    let htmlContent = '';
    let fromContent = '';
    let toMailId = mailOption.get('recipient');
    // change subject line
    let subject = 'Welcome to Technocracy Blog/Question Forum!';

    // identify which template need to send
    switch (mailType) {
      case 'post-blog':
        htmlContent = BlogSaveMailTemplate.getSaveBlogMailTemplate(mailOption.get('blog'));
        fromContent = 'Technocracy Blog <editors@tecknocracy.com>';
        subject = `[New Blog Post] ${mailOption.get("blog").title}`;
        toMailId = recipient;
        break;
      case 'on-hold-blog':
        htmlContent = BlogOnHoldMailTemplate.getOnHoldBlogMailTemplate(
            mailOption.get('blog'), recipient, mailOption.get("blog").profile.name
        );
        fromContent = 'Technocracy Blog <editors@tecknocracy.com>';
        subject = `[Blog On Hold] ${mailOption.get("blog").title}`;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'rejected-blog':
        htmlContent = BlogRejectedMailTemplate.getRejectedBlogMailTemplate(
            mailOption.get('blog'), recipient, mailOption.get("blog").profile.name
        );
        fromContent = 'Technocracy Blog <editors@tecknocracy.com>';
        subject = `[Blog Rejected] ${mailOption.get("blog").title}`;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'publish-blog':
        htmlContent = BlogPublishMailTemplate.getBlogPublishMailTemplate(
          mailOption.get('blog'), UserUtils.getUserEmail(mailOption.get("recipient"))
        );
        fromContent = 'Technocracy Blog <editors@tecknocracy.com>';
        subject = mailOption.get('blog').title;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'post-question':
        htmlContent = QuestionPostMailTemplate.getQuestionPostMailTemplate(
          mailOption.get('question'), UserUtils.getUserName(mailOption.get('user'))
        );
        fromContent = 'Technocracy Question <editors@tecknocracy.com>';
        subject = '[New post] ' + mailOption.get('question').title;
        toMailId = 'editors@tecknocracy.com';
        break;
      case 'on-hold-question':
        htmlContent = QuestionOnHoldMailTemplate.getQuestionOnHoldMailTemplate(
            mailOption.get('question'), recipient, UserUtils.getUserName(mailOption.get('recipient'))
        );
        fromContent = 'Technocracy Question <editors@tecknocracy.com>';
        subject = `[Question On Hold] ${mailOption.get('question').title}`;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'rejected-question':
        htmlContent = QuestionRejectedMailTemplate.getQuestionRejectedMailTemplate(
            mailOption.get('question'), recipient, UserUtils.getUserName(mailOption.get('recipient'))
        );
        fromContent = 'Technocracy Question <editors@tecknocracy.com>';
        subject = `[Question Rejected] ${mailOption.get('question').title}`;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'publish-question':
        htmlContent = QuestionPublishMailTemplate.getQuestionPublishMailTemplate(
          mailOption.get('question'),
          recipient,
          UserUtils.getUserName(mailOption.get('question').askedBy)
        );
        fromContent = 'Technocracy Question <editors@tecknocracy.com>';
        subject = mailOption.get('question').title;
        toMailId = UserUtils.getUserEmail(recipient);
        break;
      case 'blog-comment':
        htmlContent = CommentMailTemplate.getCommentMailTemplate(
          mailOption,
          UserUtils.getUserEmail(mailOption.get('recipient')),
          'blog'
        );
        fromContent = 'Technocracy Blog <editors@tecknocracy.com>';
        subject = '[New comment] ' + mailOption.get('blog').title;
        toMailId = recipient;
        break;
      case 'question-comment':
        htmlContent = CommentMailTemplate.getCommentMailTemplate(
          mailOption,
          UserUtils.getUserEmail(mailOption.get('recipient')),
          'question'
        );
        fromContent = 'Technocracy Question <editors@tecknocracy.com>';
        subject = '[New comment] ' + mailOption.get('question').title;
        toMailId = recipient;
        break;
      case 'welcome-mail':
        fromContent = 'Technocracy Forum <editors@tecknocracy.com>';
        htmlContent = WelcomeMailTemplate.getWelcomeMailTemplate(recipient);
        break;
      case 'activate-mail':
        fromContent = 'Technocracy Forum <editors@tecknocracy.com>';
        htmlContent = MailActivateTemplate.getMailActivateTemplate(
          mailOption.get('recipient'),
          mailOption.get('activateToken')
        );
        subject = '[Technocracy Forum] Verify your mail id to activate  your account';
        break;
      case 'password-reset-mail':
        fromContent = 'Technocracy Forum <editors@tecknocracy.com>';
        htmlContent = PasswordResetTemplate.getPasswordResetTemplate(
            mailOption.get('username'),
            mailOption.get('recipient'),
            mailOption.get('activateToken')
        );
        subject = '[Technocracy Forum] Reset your Technocracy account password';
        break;
      case 'subscribed':
        fromContent = 'Technocracy Forum <editors@tecknocracy.com>';
        htmlContent = SubscribedMailTemplate.getSubscribedMailTemplate(recipient);
        break;
      case 'error-notification':
        fromContent = 'Technocracy Production Error <editors@tecknocracy.com>';
        subject = 'Technocracy Production Error!';
        htmlContent = ProdErrorTemplate.getProdErrorTemplate(recipient, mailOption);
        break;
    }

    // setup email data with unicode symbols
    const mailOptions = {
      from: fromContent, // sender address
      to: toMailId, // list of receivers
      subject: subject, // Subject line is blog's title
      html: htmlContent, // html body
    };

    // send mail with defined transport object
    transporter
      .sendMail(mailOptions)
      .then((response: any) => {
          console.log('Mail has been sent to ', response.accepted[0]);
      })
      .catch(err => console.error(err.stack));

    // close the transporter
    transporter.close();
  }

}
