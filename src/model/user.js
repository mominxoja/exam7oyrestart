class User {
    id;
    username;
    password;
    constructor(id, username, password, token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.token = token
    }
}

module.exports = User;