import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PassportUrls } from 'common/auth/passport/common';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHelper } from '../../helpers/http.helper';
import { AuthResult } from 'common/models/auth-result.model';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'login-local-content',
    templateUrl: '../../templates/login/login-local.template.html'
})
export class LoginLocalComponent {

    public username: string;
    public password: string;

    public constructor(private http: Http, private _router: Router, private _authService: AuthService) { }

    public login($event: Event, username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http
            .post(PassportUrls.LocalLogin, {
                username: username,
                password: password
            }, options)
            .map(HttpHelper.extractAuthData)
            .catch(HttpHelper.handleError)
            .subscribe((authResult: AuthResult) => {
                if (!authResult.result) {
                    alert(authResult.failtureMessage);
                } else {
                    this._authService.login(authResult);
                    this._router.navigateByUrl('');
                }
            }, console.log);
    }
}
