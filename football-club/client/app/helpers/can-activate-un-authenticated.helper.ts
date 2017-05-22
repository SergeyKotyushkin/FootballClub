import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AuthResult } from 'common/models/auth-result.model';

@Injectable()
export class CanActivateUnAuthenticated implements CanActivate {

    public constructor(private _router: Router, private _authService: AuthService) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        return this._authService.isAuthenticated().map((isAuthenticated: boolean) => {

            if (isAuthenticated) {
                this._router.navigateByUrl('');
            }

            return !isAuthenticated;
        });
    }
}
