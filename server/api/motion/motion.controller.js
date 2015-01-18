'use strict';

var _ = require('lodash');
var Motion = require('./motion.model');
var CaptchaSeg = require('../captchaSeg/captchaSeg.model');
var CaptchaList = require('../captchaList/captchaList.model');
var i = 0;
var compareList = [];

// Get list of motions
exports.index = function(req, res) {
  Motion.find(function (err, motions) {
    if(err) { return handleError(res, err); }
    return res.json(200, motions);
  });
};

// Get a single motion
exports.show = function(req, res) {
  Motion.findById(req.params.id, function (err, motion) {
    if(err) { return handleError(res, err); }
    if(!motion) { return res.send(404); }
    return res.json(motion);
  });
};

// Creates a new motion in the DB.
exports.create = function(req, res) {
  Motion.create(req.body, function(err, motion) {
    if(err) { return handleError(res, err); }
    return res.json(201, motion);
  });
};

// Compare inserted gesture with the existed captcha
exports.compare = function(req, res) {
  // console.log(res);
  Motion.create(req.body, function(err, motion) {
    if(err) { return handleError(res, err); }
    // console.log(CaptchaSeg);
    // CaptchaSeg.findById(0, function (err, seg) {
    //   console.log(seg);
    //   return seg;
      // if (seg.name === motion.name) return true;
    // });
    CaptchaSeg.find(function (err, captchaSegs) {
      CaptchaList.find(function (err, captchaLists) {
      // if(err) { return handleError(res, err); }
      // return res.json(200, segs);

      // compare one at a time, until everything matches
      // result string
      console.log(captchaLists[0]);
      console.log(captchaLists[0].content);
      console.log(captchaSegs);

      while (i <= 3) {
        if (captchaSegs[captchaLists[0].content[i]].name === motion.name) {
        compareList[i] = "pass";
        i++;
        } else {
        compareList[i] = "fail";
        }
        return res.json(201,compareList);
      }
      });
    });
  });
};

// Updates an existing motion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Motion.findById(req.params.id, function (err, motion) {
    if (err) { return handleError(res, err); }
    if(!motion) { return res.send(404); }
    var updated = _.merge(motion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, motion);
    });
  });
};

// Deletes a motion from the DB.
exports.destroy = function(req, res) {
  Motion.findById(req.params.id, function (err, motion) {
    if(err) { return handleError(res, err); }
    if(!motion) { return res.send(404); }
    motion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
