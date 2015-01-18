'use strict';

var _ = require('lodash');
var CaptchaList = require('./captchaList.model');

// Get list of captchaLists
exports.index = function(req, res) {
  CaptchaList.find(function (err, captchaLists) {
    if(err) { return handleError(res, err); }
    return res.json(200, captchaLists);
  });
};

// Get a single captchaList
exports.show = function(req, res) {
  CaptchaList.findById(req.params.id, function (err, captchaList) {
    if(err) { return handleError(res, err); }
    if(!captchaList) { return res.send(404); }
    return res.json(captchaList);
  });
};

// Creates a new captchaList in the DB.
exports.create = function(req, res) {
  CaptchaList.create(req.body, function(err, captchaList) {
    if(err) { return handleError(res, err); }
    return res.json(201, captchaList);
  });
};

// Updates an existing captchaList in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CaptchaList.findById(req.params.id, function (err, captchaList) {
    if (err) { return handleError(res, err); }
    if(!captchaList) { return res.send(404); }
    var updated = _.merge(captchaList, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, captchaList);
    });
  });
};

// Deletes a captchaList from the DB.
exports.destroy = function(req, res) {
  CaptchaList.findById(req.params.id, function (err, captchaList) {
    if(err) { return handleError(res, err); }
    if(!captchaList) { return res.send(404); }
    captchaList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}