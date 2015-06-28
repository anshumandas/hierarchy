'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Thing'},
  active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
