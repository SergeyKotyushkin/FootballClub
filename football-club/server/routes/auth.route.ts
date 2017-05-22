import { Application } from 'express';
import { Passport } from '../auth/passport/config';

export class AuthRoute {
    public static create(app: Application) {

        Passport.initialize(app);
    }
}
