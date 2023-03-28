'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query;
    ctx.body = id;
  }

  async user() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, desc } = await ctx.service.home.user();
    ctx.body = {
      name,
      desc,
      id,
    };
  }

  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = { title };
  }
}

module.exports = HomeController;
