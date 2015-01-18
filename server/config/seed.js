/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var CaptchaSeg = require('../api/captchaSeg/captchaSeg.model');
var Motion = require('../api/motion/motion.model');
var CaptchaList = require('../api/captchaList/captchaList.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );

});

CaptchaSeg.find({}).remove(function() {
  CaptchaSeg.create({
    name: 'left',
    url: 'fa fa-long-arrow-left'
  }, {
    name: 'right',
    url: 'fa fa-long-arrow-right'
  }, {
    name: 'up',
    url: 'fa fa-long-arrow-up'
  }, {
    name: 'down',
    url: 'fa fa-long-arrow-down'
  }, {
    name: 'circle',
    url: 'fa fa-undo'
  }, function() {
    console.log('finished populating captcha segments')
  });
});

Motion.find({}).remove(function() {
  Motion.create({
    name: 'default',
    info: 'whatever'
  }, function () {
    console.log('gesture input reseted')
  });
});

CaptchaList.find({}).remove(function() {
  CaptchaList.create({
    name: 'result',
    content: [0,0,0]
  }, function() {
    console.log('CaptchaList reseted')
  });
});
