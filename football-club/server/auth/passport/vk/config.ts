import { Application, Request, Response } from 'express';
import passport = require('passport');
import vk = require('passport-vkontakte');
import { UserModel } from '../../../../common/models/user.model';
import { AuthResult } from '../../../../common/models/auth-result.model';
import { PassportUrls } from '../../../../common/auth/passport/common';
import { UserService } from '../../../services/user.service';
import * as path from 'path';

export class VkPassport {

    public initialize(app: Application) {

        if (!process.env.PASSPORT_VK_USE) {
            return;
        }

        let baseUrl = (process.env.NODE_ENV === 'development'
            ? process.env.DEV_BASEURL
            : process.env.PROD_BASEURL) + ':' + process.env.PORT;

        passport.use(
            new vk.Strategy({
                clientID: process.env.PASSPORT_VK_CLIENTID || '0',
                clientSecret: process.env.PASSPORT_VK_CLIENTSECRET,
                callbackURL: baseUrl + PassportUrls.VkCallback,
                scope: ['email'],
                profileFields: ['email']
            }, (accessToken, refreshToken, params, profile, done) => {
                process.nextTick(() => {
                    let user: UserModel = UserService.findUserByEmail(params.email);
                    done(null, new AuthResult(user));
                });
            })
        );

        app.get(PassportUrls.VkLogin, passport.authenticate('vkontakte'));

        app.get(PassportUrls.VkCallback,
            passport.authenticate('vkontakte'),
            (req: Request, res: Response) => {

                let filePath: string = path.resolve(path.join('server', 'static', 'views', 'auth-loaded.html'));
                res.sendFile(filePath)
            }
        );

        app.get(PassportUrls.VkCallback,
            passport.authenticate('vkontakte'),
            (req: Request, res: Response) => {

                let filePath: string = path.resolve(path.join('server', 'static', 'views', 'auth-loaded.html'));
                res.sendFile(filePath)
            }
        );
    }
}
