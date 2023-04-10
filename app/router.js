'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/getuserinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  router.post('/user/edituserinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.post('/user/test', _jwt, controller.user.test);
  router.post('/upload', controller.upload.upload);
};
