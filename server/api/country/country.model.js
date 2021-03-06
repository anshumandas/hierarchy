'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
  name: String,
  code: String,
  active: Boolean
});

module.exports = mongoose.model('Country', CountrySchema);
