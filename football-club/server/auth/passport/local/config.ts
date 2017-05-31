import { Application, Request, Response } from 'express';
import passport = require('passport');
import local = require('passport-local');
import { PassportUrls } from '../../../../common/auth/passport/common';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../../common/models/user.model';
import { UserWrapperModel } from '../../../../common/models/user-wrapper.model';


export class LocalPassport {

    public initialize(app: Application) {

        passport.use(
            new local.Strategy((username: string, password: string, done: any) => {
                process.nextTick(() => {
                    let user = UserService.findUser(username, password);
                    return done(null, user);
                });
            })
        );

        app.post(PassportUrls.LocalLogin,
            passport.authenticate('local'),
            (req: Request, res: Response) => {
                let user = <UserModel> req.user;
                let userWrapper = new UserWrapperModel();
                userWrapper.user = user;
                res.json(userWrapper);
            }
        );
    }
}
