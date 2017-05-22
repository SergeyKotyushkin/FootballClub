import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthResult } from 'common/models/auth-result.model';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class AuthService {

    public constructor(private _http: Http) { }

    private _authResultKey: string = 'currentAuthResult';
    private _authResultApiUrl: string = 'api/auth-result';

    public isAuthenticated(): Observable<boolean> {

        return this._http
            .get(this._authResultApiUrl)
            .map(HttpHelper.extractObjectData)
            .map((authResult: AuthResult) => authResult ? authResult.result : false)
            .catch(HttpHelper.handleError);
    }

    public getAuthResult(): Observable<AuthResult> {

        return this._http
            .get(this._authResultApiUrl)
            .map(HttpHelper.extractObjectData)
            .catch(HttpHelper.handleError);
    }

    public login(authResult: AuthResult): void {
        localStorage.setItem(this._authResultKey, JSON.stringify(authResult));
    }

    public logout(): void {
        localStorage.removeItem(this._authResultKey);
    }
}
