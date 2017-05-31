import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PassportUrls } from 'common/auth/passport/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHelper } from '../../helpers/http.helper';
import { AuthResult } from 'common/models/auth-result.model';
import { UserModel } from 'common/models/user.model';
import { UserWrapperModel } from 'common/models/user-wrapper.model';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'login-local-content',
    templateUrl: '../../templates/login/login-local.template.html'
})
export class LoginLocalComponent {

    private static _invalidCredentialsMessage = 'Invalid credentials!';
    public username: string;
    public password: string;

    public constructor(private http: Http, private _router: Router, private _authService: AuthService) { }

    public login(): void {

        if (!this.username.trim().length || !this.password.trim().length) {
            alert('Please, fill both fields!');
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http
            .post(PassportUrls.LocalLogin, {
                username: this.username,
                password: this.password
            }, options)
            .map(HttpHelper.extractAuthData)
            .map((userWrapper: UserWrapperModel) => userWrapper ? userWrapper.user : null)
            .catch((res: Response) => {
                console.log(res.status);
                if (res.status === 401) {
                    return Observable.of(null);
                }
                return HttpHelper.handleError(res);
            })
            .subscribe((user: UserModel) => {
                if (!user) {
                    alert(LoginLocalComponent._invalidCredentialsMessage);
                } else {
                    this._authService.login(user);
                    this._router.navigateByUrl('');
                }
            }, console.log);
    }
}
