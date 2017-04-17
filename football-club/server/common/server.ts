import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import { IndexRoute } from '../routes/index.route';

export class Server {

    private _rootPath: string;

    public app: express.Application;

    public constructor(rootPath: string) {
        this._rootPath = rootPath;

        this.app = express();

        this.config();

        this.routes();
    }

    public config() {
        this.app.use(serveStatic(path.join(this._rootPath, 'client'), { 'extensions': ['js', 'js.map'] }));
        this.app.use('/node_modules', express.static(path.join(this._rootPath, 'node_modules')));

        this.app.use('/favicon.ico', express.static('client/favicon.ico'));

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
    }

    public routes() {
        let router: express.Router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
}
