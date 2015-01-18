'use strict';

var _ = require('lodash');
var CaptchaSeg = require('./captchaSeg.model');
var CaptchaList = require('../captchaList/captchaList.model');
var i = 0;
var temp = 0;
var CaptchaCombo = [];
var CaptchaResult = [];
var captchaList = [];

// Get list of captchaSegs
exports.index = function(req, res) {
  CaptchaSeg.find(function (err, captchaSegs) {
    if(err) { return handleError(res, err); }
    return res.json(200, captchaSegs);
  });
};

// get combo of 3 captcha segs
exports.combo = function(req, res) {
  captchaList = [];
  CaptchaSeg.find(function (err, captchaSegs) {
  for (i = 0; i < 3; i++) {
    temp = Math.floor(Math.random() * 5);
    captchaList.push(temp);
    CaptchaCombo.push(captchaSegs[temp]);
  }
  // console.log(CaptchaList);

  // CaptchaList.findById(req.params.id, function (err, captchaList) {
  //   var updated = _.merge(captchaList, req.body);
  //   updated.save(function (err) {
  //     if (err) { return handleError(res, err); }
  //     return res.json(200, captchaSeg);
  //   });
  // });
  // CaptchaList.find(function (err, captchaList) {
  //   console.log(CaptchaList)
  // });

  // clear previous list
  // add new list
  // console.log(req.body);
  CaptchaList.find(function (err, CaptchaLists) {
    console.log(CaptchaLists);
    CaptchaLists[0].name = "result";
    CaptchaLists[0].content = captchaList;
    CaptchaLists[0].save(function(err) {
      if (err) throw err;
      console.log(CaptchaLists);
      CaptchaList.find(function (err, CaptchaLists2) {
    console.log(CaptchaLists2);
    });
    });
    // CaptchaList.create('/api/captchaLists'.body, function(err, captchaListItem) {
    //   if(err) { return handleError(res, err); }
    //   return res.json(201, captchaListItem);
    // });

    // console.log(captchaList);
    // console.log(CaptchaLists);
  });

  CaptchaResult = CaptchaCombo;
  CaptchaCombo = [];
  return res.json(200, CaptchaResult);
  });
};


// Get a single captchaSeg
exports.show = function(req, res) {
  CaptchaSeg.findById(req.params.id, function (err, captchaSeg) {
    if(err) { return handleError(res, err); }
    if(!captchaSeg) { return res.send(404); }
    return res.json(captchaSeg);
  });
};

// Creates a new captchaSeg in the DB.
exports.create = function(req, res) {
  CaptchaSeg.create(req.body, function(err, captchaSeg) {
    if(err) { return handleError(res, err); }
    return res.json(201, captchaSeg);
  });
};

// Updates an existing captchaSeg in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CaptchaSeg.findById(req.params.id, function (err, captchaSeg) {
    if (err) { return handleError(res, err); }
    if(!captchaSeg) { return res.send(404); }
    var updated = _.merge(captchaSeg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, captchaSeg);
    });
  });
};

// Deletes a captchaSeg from the DB.
exports.destroy = function(req, res) {
  CaptchaSeg.findById(req.params.id, function (err, captchaSeg) {
    if(err) { return handleError(res, err); }
    if(!captchaSeg) { return res.send(404); }
    captchaSeg.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
