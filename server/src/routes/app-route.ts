import {Application, Request, Response} from 'express';
import {AppController} from "../controllers/app-controller";

export class AppRoute {
    BASE_URL = '/api';

    public appController: AppController = new AppController();

    public routes(app: Application): void {

        // API base URL
        app.route(this.BASE_URL)
            .get((req: Request, res: Response) => {
                // res.writeHead(200, {"Content-Type": "application/json"});
                res.json({message: 'Welcome to Technocracy REST APIs!!!!'});
            });
    }
}
