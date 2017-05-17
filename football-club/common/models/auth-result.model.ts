import { UserModel } from './user.model';

export class AuthResult {

    public result: boolean;
    public user: UserModel;
    public failtureMessage: string;

    public constructor(user: UserModel, failtureMessage?: string) {
        this.result = user != null;
        this.user = user;
        this.failtureMessage = this.result ? null : failtureMessage;
    }
}
