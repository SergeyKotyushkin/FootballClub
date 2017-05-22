import {UserModel} from '../models/user.model'

let mockUsers = [
    new UserModel('id1', 'user1@mail.ru', 'user1', 'pass1', ''),
    new UserModel('id2', 'user2@mail.ru', 'user2', 'pass2', ''),
    new UserModel('id3', 'user3@mail.ru', 'user3', 'pass3', ''),
    new UserModel('id4', 'ser_pro_10@mail.ru', 'this', 'pass', '')
];

export {mockUsers as MockUsers}
