import { Component, AfterContentChecked } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, Event as RoterEvent, NavigationStart } from '@angular/router';
import { AuthResult } from 'common/models/auth-result.model';
import { PassportUrls } from 'common/auth/passport/common';
import { HttpHelper } from '../helpers/http.helper';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '../templates/app.template.html'
})
export class AppComponent {


    public constructor(private _http: Http, private _router: Router) {
        this.isAuthBeingChecking = true;

        this._router.events
            .filter((event: RoterEvent) => event instanceof NavigationStart)
            .subscribe((event: RoterEvent) => this._updateAuthResult());
    }

    public username: string;
    public isAuthenticated: boolean;
    public isAuthBeingChecking: boolean;

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


    private _updateAuthResult() {
        // turn on disabling login and logout button on route changes
        //this.isAuthBeingChecking = true;

        this._http
            .get("api/auth-result")
            .map((res: Response) => HttpHelper.extractObjectData(res))
            .catch((res: Response) => HttpHelper.handleError(res))
            .subscribe((authResult: AuthResult) => {
                this.isAuthenticated = authResult ? authResult.result : false;
                this.username = this.isAuthenticated ? authResult.user.username : null;
            }, (error: any) => {
                localStorage.removeItem("currentAuthResult");
                this._router.navigateByUrl('');
            }, () => {
                this.isAuthBeingChecking = false;
            });
    }
}
