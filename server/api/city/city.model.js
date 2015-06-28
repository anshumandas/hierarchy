'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: String,
  country: String,
  active: Boolean
});

module.exports = mongoose.model('City', CitySchema);
