import { AuthResult } from 'common/models/auth-result.model';

export class AuthService {

    private _authResultKey: string = 'currentAuthResult';

    public isAthenticated(): boolean {
        let authResultString: string = localStorage.getItem(this._authResultKey);
        let authResult: AuthResult = authResultString ? JSON.parse(authResultString) : null;

        return authResult ? authResult.result : false;
    }

    public login(authResult: AuthResult): void {
        localStorage.setItem(this._authResultKey, JSON.stringify(authResult));
    }

    public logout(): void {
        localStorage.removeItem(this._authResultKey);
    }
}
