import { UserModel } from '../../common/models/user.model';
import { MockUsers } from '../../common/mock/users.mock';

export class UserService {

    public static findUser(username: string, password: string): UserModel {
        let mockUsers = MockUsers;
        return mockUsers.find((u) => u.username === username && u.password === password);
    }

    public static findUserByEmail(email: string): UserModel {
        if (!email) {
            return null;
        }

        let mockUsers = MockUsers;
        return mockUsers.find((u) => u.email === email);
    }

}
