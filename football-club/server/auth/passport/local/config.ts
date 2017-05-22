import { Application, Request, Response } from 'express';
import passport = require('passport');
import local = require('passport-local');
import { PassportUrls } from '../../../../common/auth/passport/common';
import { UserService } from '../../../services/user.service';
import { AuthResult } from '../../../../common/models/auth-result.model';


export class LocalPassport {

    public initialize(app: Application) {

        passport.use(
            new local.Strategy((username: string, password: string, done: any) => {
                process.nextTick(() => {
                    let user = UserService.findUser(username, password);
                    return done(null, new AuthResult(user));
                });
            })
        );

        app.post(PassportUrls.LocalLogin,
            passport.authenticate('local'),
            (req: Request, res: Response) => {
                var authResult: AuthResult = req.user;
                authResult.failtureMessage = authResult.result ? '' : 'Invalid credentials!';
                res.json(authResult);
            }
        );
    }
}
