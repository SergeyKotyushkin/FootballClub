import { Component, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, Event as RouterEvent, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { AuthResult } from 'common/models/auth-result.model';
import { PassportUrls } from 'common/auth/passport/common';
import { HttpHelper } from '../helpers/http.helper';
import { AuthService } from '../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '../templates/app.template.html'
})
export class AppComponent implements OnDestroy {

    public username: string;
    public isAuthenticated: boolean;
    public isAuthBeingChecking: boolean;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _logoutSub: Subscription;
    private _authSub: Subscription;


    public constructor(
        private _http: Http,
        private _router: Router,
        private _authService: AuthService) {

        this.isAuthBeingChecking = true;

        this._router.events
            .filter((event: RouterEvent) => event instanceof NavigationStart)
            .takeUntil(this._ngUnsubscribe)
            .subscribe((event: RouterEvent) => this._updateAuthResult());
    }

    public logout() {
        if (this._logoutSub) {
            this._logoutSub.unsubscribe();
        }

        this._logoutSub = this._http.get(PassportUrls.Logout)
            .map(HttpHelper.extractObjectData)
            .catch((res: Response) => {
                this._authService.logout();
                return HttpHelper.handleError(res);
            })
            .subscribe((result: boolean) => {
                if (!result) {
                    console.log("An error has been occured on logout");
                }

                this._authService.logout();

                if (this._router.url === '/') {
                    this._updateAuthResult();
                    return;
                }

                this._router.navigateByUrl('');
            });
    }

    public ngOnDestroy() {
        if (this._authSub) {
            this._authSub.unsubscribe();
        }
        if (this._logoutSub) {
            this._logoutSub.unsubscribe();
        }

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    private _updateAuthResult() {
        // turn on disabling login and logout button on route changes
        //this.isAuthBeingChecking = true;

        if (this._authSub) {
            this._authSub.unsubscribe();
        }

        this._authSub = this._authService
            .getAuthResult()
            .subscribe((authResult: AuthResult) => {
                this.isAuthenticated = authResult ? authResult.result : false;
                this.username = this.isAuthenticated ? authResult.user.username : null;
            }, (error: any) => {
                this._authService.logout();
                this._router.navigateByUrl('');
            }, () => {
                this.isAuthBeingChecking = false;
            });
    }
}
