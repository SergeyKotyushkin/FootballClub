import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PassportUrls } from 'common/auth/passport/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/interval';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AuthResult } from 'common/models/auth-result.model';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginIFrameDialogComponent } from './login-iframe-dialog.component';

@Component({
    moduleId: module.id
})
export abstract class LoginBaseOAuthComponent implements OnDestroy {

    private _router: Router;
    private _authService: AuthService;
    private _domSanitizer: DomSanitizer;
    private _dialog: MdDialog;

    public loginUrl: string;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _authWindowSub: Subscription;
    private _dialogRef: MdDialogRef<LoginIFrameDialogComponent>;

    public constructor(
        loginUrl: string,
        _router: Router,
        _authService: AuthService,
        _domSanitizer: DomSanitizer,
        _dialog: MdDialog) {

        this.loginUrl = loginUrl;
        this._router = _router;
        this._authService = _authService;
        this._domSanitizer = _domSanitizer;
        this._dialog = _dialog;
    }

    public openDialog() {
        let config = new MdDialogConfig();
        this._dialogRef = this._dialog.open(LoginIFrameDialogComponent, config);
        this._dialogRef.componentInstance.src =
            this._domSanitizer.bypassSecurityTrustResourceUrl(this.loginUrl);

        if (this._authWindowSub) this._authWindowSub.unsubscribe();
        this._authWindowSub = Observable.interval(2000)
            .map(() => {
                this._authService
                    .isAuthenticated()
                    .takeUntil(this._ngUnsubscribe)
                    .subscribe(data => {
                        if (data) {
                            this._router.navigateByUrl('');
                            this._dialogRef.close();
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
