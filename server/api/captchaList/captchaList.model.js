'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CaptchaListSchema = new Schema({
  name: String,
  content: Object
});

module.exports = mongoose.model('CaptchaList', CaptchaListSchema);
