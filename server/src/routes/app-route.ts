import {Application, Request, Response} from 'express';
import {AppController} from "../controllers/app-controller";

export class AppRoute {
    BASE_URL = '/api';

    public appController: AppController = new AppController();

    public routes(app: Application): void {

        // API base URL
        app.route(this.BASE_URL)
            .get((req: Request, res: Response) => {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.json({message: 'Welcome to Technocracy REST APIs!!!!'});
            });

        // API URLs for subscription
        app.route(`${this.BASE_URL}/subscribe/:email`).get(this.appController.subscribe);
        app.route(`${this.BASE_URL}/unsubscribe/:email`).get(this.appController.unsubscribe);
    }
}
