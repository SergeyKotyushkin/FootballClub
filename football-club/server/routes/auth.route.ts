import { NextFunction, Request, Response, Router, Application } from 'express';
import { BaseRoute } from '../common/base.route';
import { LocalPassport } from '../../common/auth/passport/local/config';

export class AuthRoute {
    public static create(app: Application) {
        let localPassport = new LocalPassport();
        localPassport.initialize(app);
    }
}
