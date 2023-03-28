'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async user() {
    const { app } = this;
    const QUERY_STR = 'id, name';
    const sql = `select ${QUERY_STR} from test`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
    // return {
    //   name: 'fb',
    //   desc: '123123123',
    // };
  }

  async addUser(name) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('test', { name });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async editUser(id, name) {
    const { app } = this;
    try {
      const result = await app.mysql.update(
        'test',
        { name },
        {
          where: {
            id,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUser(id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('test', { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = HomeService;
