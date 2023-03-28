/* eslint-disable no-unused-vars */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const { id } = ctx.query;
    // ctx.body = id;
    await ctx.render('index.html', {
      title: 'hello world',
    });
  }

  async user() {
    const { ctx } = this;
    // const { id } = ctx.params;
    const result = await ctx.service.home.user();
    // const { name, desc } = await ctx.service.home.user();
    // ctx.body = {
    //   name,
    //   desc,
    //   id,
    // };
    ctx.body = result;
  }

  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        message: '添加成功',
        data: null,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        message: '添加失败',
        data: null,
      };
    }
  }

  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        message: '修改成功',
        data: null,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        message: '修改失败',
        data: null,
      };
    }
  }

  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        message: '删除成功',
        data: null,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        message: '删除失败',
        data: null,
      };
    }
  }

  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = { title };
  }
}

module.exports = HomeController;
