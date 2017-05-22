export class UserModel {

    public id: string;
    public email: string;
    public username: string;
    public password: string;
    public photo: string;
    public vk: UserVkModel;

    constructor(id: string, email: string, username: string, password: string,
        photo: string, vkUsername?: string, vkPhoto?: string) {

        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.vk = new UserVkModel(vkUsername, vkPhoto);
    }
}

export class UserVkModel {

    public username: string;
    public pic: string;

    constructor(username?: string, pic?: string) {

        this.username = username || null;
        this.pic = pic || null;
    }
}
