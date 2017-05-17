import { Application, Request, Response } from 'express';
import passport = require('passport');
import local = require('passport-local');
import * as passportLocal from 'passport-local';
import { UserModel } from '../../../models/user.model';
import { AuthResult } from '../../../models/auth-result.model';
import { MockUsers } from '../../../mock/users.mock';
import { PassportUrls } from '../../../auth/passport/common';


export class LocalPassport {

    public initialize(app: Application) {

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(
            new local.Strategy((username: string, password: string, done: any) => {

                let res = this._findUser(username, password);
                let err = res[0];
                let user = res[1];
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, user)
                }
                return done(null, user);
            })
        );

        passport.serializeUser((authResult: AuthResult, done) => {
            if (authResult.result) {
                done(null, authResult.user.id);
            } else {
                done(null, {});
            }
        });
        passport.deserializeUser((id: string, done) => {
            if (id == null) {
                done(null, new AuthResult(null));
                return;
            }

            let res = this._findUserById(id);
            let err = res[0];
            let authResult = res[1];
            err ? done(err) : done(null, authResult);
        });

        app.post(PassportUrls.LocalLogin,
            passport.authenticate('local'),
            (req: Request, res: Response) => res.json(req.user)
        );

        app.get(PassportUrls.LocalLogout, (req: Request, res: Response) => {
            req.logout();
            res.json(true);
        });
    }

    private _findUser(username: string, password: string): [Error, AuthResult] {
        let mockUsers = MockUsers;
        let user = mockUsers.find((u) => u.username === username && u.password === password);
        return [null, new AuthResult(user, 'Invalid credentials')];
    }

    private _findUserById(id: string): [Error, AuthResult] {
        let mockUsers = MockUsers;
        let user = mockUsers.find((u) => u.id === id);
        return [null, new AuthResult(user, 'Invalid user')];
    }
}
