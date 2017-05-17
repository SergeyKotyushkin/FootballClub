import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateUnAuthenticated implements CanActivate {

    public constructor(private _router: Router, private _authService: AuthService) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        let result: boolean = this._authService.isAthenticated();

        if (result) {
            this._router.navigateByUrl('');
        }

        return !result;
    }
}
