'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MotionSchema = new Schema({
  name: String,
  info: String,
});

module.exports = mongoose.model('Motion', MotionSchema);
