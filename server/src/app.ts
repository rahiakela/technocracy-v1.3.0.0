import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import {AppRoute} from './routes/app-route';
import {BlogRoute} from './routes/blog-route';
import {QuestionRoute} from './routes/question-route';
import {AuthRoute} from "./routes/auth-route";
import {ProfileRoute} from "./routes/profile-route";
import {AuthToken} from "./auth/auth-token";
import * as errorHandler from 'errorhandler';
import {CommentRoute} from "./routes/comment-route";

// Load environment variables from .env file, where API keys and passwords are configured.
require('dotenv').config();

// register models and schema
require('./models/blog.model');
require('./models/profile.model');
require('./models/user.model');
require('./models/question.model');
require('./models/comment.model');

export class App {

    public app: express.Application;
    public authToken: AuthToken = new AuthToken();

    public appRoute: AppRoute = new AppRoute();
    public authRoute: AuthRoute = new AuthRoute();
    public profileRoute: ProfileRoute = new ProfileRoute();
    public blogRoute: BlogRoute = new BlogRoute();
    public questionRoute: QuestionRoute = new QuestionRoute();
    public commentRoute: CommentRoute = new CommentRoute();

    constructor() {

        // initiate app object
        this.app = express();
        this.config();

        // register API routes
        this.api();

        // connect to mongodb
        this.connectMongo();
    }

    private config() {

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false}));

        // catch 404 and forward to error handler
        this.app.use(function(
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    /**
     * Configure API route
     */
    private api() {

        // configure CORS
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false
        };
        this.app.use(cors(corsOptions));

        // register routes
        this.appRoute.routes(this.app);
        this.authRoute.routes(this.app);
        this.profileRoute.routes(this.app, this.authToken);
        this.blogRoute.routes(this.app, this.authToken);
        this.questionRoute.routes(this.app, this.authToken);
        this.commentRoute.routes(this.app, this.authToken);

        // enable CORS pre-flight
        this.app.options('*', cors(corsOptions));
    }

    /**
     * Configure MongoDB connection
     */
    private connectMongo() {

        // connecting to AWS development MongoDB
        let MONGO_DB_URI = process.env.DEV_AWS_MONGODB_URI;
        if (process.env.NODE_ENV === 'prod') {
            // connecting to DU production MongoDB
            MONGO_DB_URI = process.env.PROD_DO_MONGODB_URI;
        }
        mongoose.connect(MONGO_DB_URI, { useNewUrlParser: false });

        // monitoring the connection with mongoose connection events
        mongoose.connection.on('connected', () => {
            console.log(`Mongoose connected to ${MONGO_DB_URI}`);
        });
        mongoose.connection.on('error', error => console.log(`Mongoose connection error: ${error}`));
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
    }
}
