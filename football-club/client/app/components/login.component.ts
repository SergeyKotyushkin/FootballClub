import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PassportUrls } from 'common/auth/passport/common';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHelper } from '../helpers/http.helper';
import { AuthResult } from 'common/models/auth-result.model';

@Component({
    moduleId: module.id,
    selector: 'login-content',
    templateUrl: '../templates/login.template.html'
})
export class LoginComponent {

    public username: string;
    public password: string;

    public constructor(private http: Http, private _router: Router) { }

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
                    localStorage.setItem("currentAuthResult", JSON.stringify(authResult));
                    this._router.navigateByUrl('');
                }
            }, console.log);
    }
}
