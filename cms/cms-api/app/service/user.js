const { Service } =  require('egg');

class UserService extends Service {
    async list () {
        let { app } = this;
        let result = await app.mysql.select('user');
        return result;

    }
    async create (user) {
        let { app } = this;
        let result = await app.mysql.insert('user', user);
        return result;
    }
    async update (user) {
        let { app } = this;
        // update user set
        let result = await app.mysql.update('user', user);
        return result;
    }
    async destroy (id) {
        let { app } = this;
        let result = await app.mysql.delete('user', {id});
        return result;
    }
}

module.exports = UserService;