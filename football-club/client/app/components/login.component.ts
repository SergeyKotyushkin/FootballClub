import { Component, Input } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import {PassportUrls} from 'common/auth/passport/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHelper } from 'common/helpers/http.helper';
import { AuthResult } from 'common/models/auth-result.model';

@Component({
    moduleId: module.id,
    selector: 'login-content',
    templateUrl: '../templates/login.template.html',
    providers: [Location]
})
export class LoginComponent {

    @Input() username: string;
    @Input() password: string;

    public constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

    private executeLogin(username: string, password: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(
            PassportUrls.LocalLogin, {
                username: username,
                password: password
            }, options)
            .map(HttpHelper.extractAuthData);
    }

    public login() {
        this.executeLogin(this.username, this.password)
            .subscribe(
            (authResult: AuthResult) => {
                if (!authResult.result) {
                    alert(authResult.failtureMessage);
                } else {
                    localStorage.setItem("currentAuthResult", JSON.stringify(authResult));
                    this.router.navigateByUrl('');
                }
            },
            e => console.log(e)
            );
    }
}
