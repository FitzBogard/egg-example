/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1679633859519_1333';

  // add your middleware config here
  config.middleware = [];

  // security authorization
  config.security = {
    csrf: {
      enable: false,
      igoreJson: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.view = {
    mapping: { '.html': 'ejs' },
  };

  exports.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'shshxy00',
      database: 'egg-test',
    },
    app: true,
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: 'Nick',
  };

  return {
    ...config,
    ...userConfig,
  };
};
