import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../common/base.route';
import * as path from 'path';

export class IndexRoute extends BaseRoute {

    public static create(router: Router) {

        router.get("*", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    public constructor() {
        super();
    }

    private index(req: Request, res: Response, next: NextFunction) {
        let filePath: string = path.resolve(path.join('client', 'index.html'));
        this.sendFile(req, res, filePath);
    }
}
