'use strict';

var _ = require('lodash');
var CaptchaSeg = require('./captchaSeg.model');

// Get list of captchaSegs
exports.index = function(req, res) {
  CaptchaSeg.find(function (err, captchaSegs) {
    if(err) { return handleError(res, err); }
    return res.json(200, captchaSegs);
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