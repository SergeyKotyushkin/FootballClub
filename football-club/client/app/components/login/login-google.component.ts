import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PassportUrls } from 'common/auth/passport/common';
import { MdDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginBaseOAuthComponent } from './login-base-oauth.component';

@Component({
    moduleId: module.id,
    selector: 'login-google-content',
    templateUrl: '../../templates/login/login-google.template.html'
})
export class LoginGoogleComponent extends LoginBaseOAuthComponent implements OnDestroy {

    public constructor(
        _router: Router,
        _authService: AuthService,
        _domSanitizer: DomSanitizer,
        _dialog: MdDialog) {

        super(PassportUrls.GoogleLogin, _router, _authService, _domSanitizer, _dialog);
    }

    public openDialog() {
        super.openDialog();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }
}
