'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CaptchaSegSchema = new Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model('CaptchaSeg', CaptchaSegSchema);
