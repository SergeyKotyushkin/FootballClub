import { Application, Request, Response } from 'express';
import passport = require('passport');
import local = require('passport-local');
import * as passportLocal from 'passport-local';
import { UserModel } from '../../../common/models/user.model';
import { MockUsers } from '../../../common/mock/users.mock';
import { PassportUrls } from '../../../common/auth/passport/common';
import { LocalPassport } from './local/config';
import { GooglePassport } from './google/config';
import { VkPassport } from './vk/config';
import { UserService } from '../../services/user.service';


export class Passport {

    public static initialize(app: Application) {

        app.use(passport.initialize());
        app.use(passport.session());

        let localPassport = new LocalPassport();
        localPassport.initialize(app);

        if (!process.env.PASSPORT_GOOGLE_USE) {
            let googlePassport = new GooglePassport();
            googlePassport.initialize(app);
        }

        if (process.env.PASSPORT_VK_USE) {
            let vkPassport = new VkPassport();
            vkPassport.initialize(app);
        }

        app.get(PassportUrls.Logout, (req: Request, res: Response) => {
            req.session.destroy((e) => {
                req.logout();
                res.json(true);
            });
        });

        passport.serializeUser((user: UserModel, done) => {

            done(null, user ? user.email : null);
        });

        passport.deserializeUser((email: string, done) => {

            if (email == null) {
                done(null, null);
                return;
            }

            let user = UserService.findUserByEmail(email);
            done(null, user);
        });
    }
}
