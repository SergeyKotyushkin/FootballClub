import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthResult } from 'common/models/auth-result.model';

@Injectable()
export class CanActivateUnAuthenticated implements CanActivate {

    public constructor(private _router: Router) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        let authResultString: string = localStorage.getItem("currentAuthResult");
        let authResult: AuthResult = authResultString ? JSON.parse(authResultString) : null;

        let result: boolean = authResult ? !authResult.result : true;

        if (!result) {
            this._router.navigateByUrl('');
        }

        return result;
    }
}
