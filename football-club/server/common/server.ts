import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import expressSession = require('express-session');
import { IndexRoute } from '../routes/index.route';
import { ApiRoute } from '../routes/api.route';
import { AuthRoute } from '../routes/auth.route';

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
        this.app.use(express.static(path.join(this._rootPath, 'client'), { extensions: ['js'] }));
        this.app.use('/static', express.static(path.join(this._rootPath, 'server/static')));
        this.app.use('/common', express.static(path.join(this._rootPath, 'common'), { extensions: ['js'] }));
        this.app.use('/node_modules', express.static(path.join(this._rootPath, 'node_modules')));

        this.app.use('/favicon.ico', express.static('client/favicon.ico'));

        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(expressSession({ secret: 'true', resave: true, saveUninitialized: true }));

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
    }

    public routes() {
        let router: express.Router = express.Router();

        //AuthRoute
        AuthRoute.create(this.app);

        //ApiRoute
        ApiRoute.create(router);

        //IndexRoute
        IndexRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
}
