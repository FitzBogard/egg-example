'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.post('/user/test', _jwt, controller.user.test);
};
