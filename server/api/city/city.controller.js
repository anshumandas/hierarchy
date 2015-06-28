'use strict';

var _ = require('lodash');
var City = require('./city.model');
var Country = require('../country/country.model');

// Get list of cities
exports.index = function(req, res) {
  City.find(function (err, cities) {
    if(err) { return handleError(res, err); }
    return res.json(200, cities);
  });
};

// Get a list of cities by country
exports.find = function(req, res) {
  Country.find({code:req.params.id}, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country && !country[0]) { return res.send(404); }
    City.find({country:country[0].name, name: {'$ne':null}}, function (err, city) {
      if(err) { return handleError(res, err); }
      if(!city) { return res.send(404); }
        console.log(city);
      return res.json(city);
    });
  });
};

// Get a single city
exports.show = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    return res.json(city);
  });
};

// Creates a new city in the DB.
exports.create = function(req, res) {
  City.create(req.body, function(err, city) {
    if(err) { return handleError(res, err); }
    return res.json(201, city);
  });
};

// Updates an existing city in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  City.findById(req.params.id, function (err, city) {
    if (err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    var updated = _.merge(city, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, city);
    });
  });
};

// Deletes a city from the DB.
exports.destroy = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    city.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
