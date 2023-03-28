'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);
  router.get('/user', controller.home.user);
  router.post('/add', controller.home.add);
  router.post('/addUser', controller.home.addUser);
  router.post('/editUser', controller.home.editUser);
  router.post('/deleteUser', controller.home.deleteUser);
};
