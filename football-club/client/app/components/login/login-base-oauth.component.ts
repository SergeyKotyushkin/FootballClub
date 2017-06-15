import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PassportUrls } from 'common/auth/passport/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/interval';
import { AuthResult } from 'common/models/auth-result.model';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id
})
export abstract class LoginBaseOAuthComponent implements OnDestroy {

    private _router: Router;
    private _authService: AuthService;

    public loginUrl: string;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _authWindowSub: Subscription;

    public constructor(
        loginUrl: string,
        _router: Router,
        _authService: AuthService) {

        this.loginUrl = loginUrl;
        this._router = _router;
        this._authService = _authService;
    }

    public openAuthWindow() {
        let newWindow = window.open(this.loginUrl, 'Authentication Window', "height=450, width=750;");
        newWindow.focus();

        if (this._authWindowSub) this._authWindowSub.unsubscribe();
        this._authWindowSub = Observable.interval(2000)
            .map(() => {
                this._authService
                    .isAuthenticated()
                    .takeUntil(this._ngUnsubscribe)
                    .subscribe(data => {
                        if (data) {
                            this._router.navigateByUrl('');
                            newWindow.close();
                        }
                    })
            })
            .subscribe();
    }

    public ngOnDestroy() {
        if (this._authWindowSub) {
            this._authWindowSub.unsubscribe();
        }

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }
}
