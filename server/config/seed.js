/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var fs = require('fs');
var _ = require('lodash');

var assets = [];
fs.readdir('./server/config', function (err, files) {
  if(!err) {
      for(var i = 0; i < files.length; i++){
          if(_.endsWith(files[i], 'json')) {
              assets[files[i]] = require('./'+files[i]);
          }
      }
  }
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'countries',
    info : 'Choose Country'
  }, {
    name : 'cities',
    info : 'Choose City'
  }, function(err, t1, t2){
      t2.parent = t1._id;
      t2.save();
  });
});

var Country = require('../api/country/country.model');

Country.find({}).remove(function() {
  Country.create(assets['countries.json']);
});

var City = require('../api/city/city.model');

City.find({}).remove(function() {
  var cities = assets['cities.json'];

  City.create(cities);

});
