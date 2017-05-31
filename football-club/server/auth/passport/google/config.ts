import { Application, Request, Response } from 'express';
import passport = require('passport');
import google = require('passport-google-oauth');
import { UserModel } from '../../../../common/models/user.model';
import { PassportUrls } from '../../../../common/auth/passport/common';
import { UserService } from '../../../services/user.service';
import * as path from 'path';


export class GooglePassport {

    public initialize(app: Application) {

        if (!process.env.PASSPORT_GOOGLE_USE) {
            return;
        }

        let baseUrl = (process.env.NODE_ENV === 'development'
            ? process.env.DEV_BASEURL
            : process.env.PROD_BASEURL) + ':' + process.env.PORT;

        passport.use(
            new google.OAuth2Strategy({
                clientID: process.env.PASSPORT_GOOGLE_CLIENTID || '0',
                clientSecret: process.env.PASSPORT_GOOGLE_CLIENTSECRET,
                callbackURL: baseUrl + PassportUrls.GoogleCallback
            }, (accessToken: string,
                refreshToken: string,
                profile: google.Profile,
                done: (error: any, user?: UserModel) => void) => {
                    process.nextTick(() => {
                        let user: UserModel = UserService.findUserByEmail(profile.emails[0].value);
                        done(null, user);
                    });
                })
        );


        app.get(PassportUrls.GoogleLogin,
            passport.authenticate('google', {
                scope: ['https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/userinfo.email']
            })
        );

        app.get(PassportUrls.GoogleCallback,
            passport.authenticate('google'),
            (req: Request, res: Response) => {

                let filePath: string = path.resolve(path.join('server', 'static', 'views', 'auth-loaded.html'));
                res.sendFile(filePath)
            }
        );
    }
}
