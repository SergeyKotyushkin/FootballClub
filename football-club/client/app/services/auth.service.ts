import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from 'common/models/user.model';
import { UserWrapperModel } from 'common/models/user-wrapper.model';
import { HttpHelper } from '../helpers/http.helper';

@Injectable()
export class AuthService {

    public constructor(private _http: Http) { }

    private _currentUserKey: string = 'currentUser';
    private _currentUserApiUrl: string = 'api/current-user';

    public isAuthenticated(): Observable<boolean> {

        return this._http
            .get(this._currentUserApiUrl)
            .map(HttpHelper.extractObjectData)
            .map((userWrapper: UserWrapperModel) => userWrapper && userWrapper.user)
            .catch(HttpHelper.handleError);
    }

    public getCurrentUser(): Observable<UserModel> {

        return this._http
            .get(this._currentUserApiUrl)
            .map(HttpHelper.extractObjectData)
            .map((userWrapper: UserWrapperModel) => userWrapper ? userWrapper.user : null)
            .catch(HttpHelper.handleError);
    }

    public login(user: UserModel): void {
        localStorage.setItem(this._currentUserKey, JSON.stringify(user));
    }

    public logout(): void {
        localStorage.removeItem(this._currentUserKey);
    }
}
