'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async user() {
    return {
      name: 'fb',
      desc: '123123123',
    };
  }
}
module.exports = HomeService;
