import { UserModel } from '../../common/models/user.model';
import { MockUsers } from '../../common/mock/users.mock';

export class UserService {

    public static findUser(username: string, password: string): UserModel {
        let mockUsers = MockUsers;
        let user = mockUsers.find((u) => u.username === username && u.password === password);
        return this._fixUser(user);
    }

    public static findUserByEmail(email: string): UserModel {
        if (!email) {
            return null;
        }

        let mockUsers = MockUsers;
        let user = mockUsers.find((u) => u.email === email);
        return this._fixUser(user);
    }


    private static _fixUser(user: UserModel): UserModel {
        if (!!!user) {
            return null;
        }

        let fixedUser = <UserModel> {...user };
        delete fixedUser.password;
        return fixedUser;
    }

}
