import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthResult } from 'common/models/auth-result.model';
import { PassportUrls } from 'common/auth/passport/common';
import { HttpHelper } from 'common/helpers/http.helper';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '../templates/app.template.html'
})
export class AppComponent {

    public UserName: string;

    public constructor(private _http: Http, private _router: Router) { }

    public IsAuthenticated(): boolean {

        let authResult: AuthResult = JSON.parse(localStorage.getItem("currentAuthResult"));
        let isAuthenticated: boolean = authResult ? authResult.result : false;
        this.UserName = isAuthenticated ? authResult.user.username : null;

        return isAuthenticated;
    }


    public logout() {
        return this._http.get(PassportUrls.LocalLogout)
            .map((res: Response) => {
                let isLoggedOut: boolean = HttpHelper.extractObjectData(res);
                return isLoggedOut;
            })
            .catch((res: Response) => {
                localStorage.removeItem("currentAuthResult");
                return HttpHelper.handleError(res);
            }).subscribe((result: boolean) => {
                if (!result) {
                    console.log("An error has been occured on logout");
                }

                localStorage.removeItem("currentAuthResult");
                this._router.navigateByUrl('');
            });
    }
}
