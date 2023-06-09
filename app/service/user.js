const Service = require('egg').Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(params) {
    const { app } = this;
    try {
      return await app.mysql.insert('user', params);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async editUserInfo(params) {
    const { app } = this;
    try {
      return await app.mysql.update('user', {
        ...params,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = UserService;
