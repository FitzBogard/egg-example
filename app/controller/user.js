const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null,
      };
      return;
    }
    const userInfo = await ctx.service.user.getUserByName(username);
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户名已存在',
        data: null,
      };
      return;
    }
    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
    const result = ctx.service.user.register({
      username,
      password,
      avatar: defaultAvatar,
      sign: '11',
    });
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null,
      };
      return;
    }
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token,
      },
    };
  }

  async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        ...decode,
      },
    };
  }

  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
      },
    };
  }

  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) {
        return;
      }
      // const userInfo = ctx.service.user.getUserByName(decode.username);
      await ctx.service.user.editUserInfo({
        id: decode.id,
        signature,
        avatar,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: decode.id,
          signature,
          avatar,
        },
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserController;
