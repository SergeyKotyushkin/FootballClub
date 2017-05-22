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
    moduleId: module.id,
    selector: 'login-vk-content',
    templateUrl: '../../templates/login/login-vk.template.html'
})
export class LoginVkComponent implements OnDestroy {

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _authWindowSub: Subscription;

    public constructor(private _router: Router, private _authService: AuthService) { }

    public ngOnDestroy() {
        if (this._authWindowSub) {
            this._authWindowSub.unsubscribe();
        }

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    private openAuthWindow() {

        var newWindow = window.open(PassportUrls.VkLogin, 'name', 'height=585, width=770');
        if (window.focus) {
            newWindow.focus();
        }

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
}
