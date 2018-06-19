'use strict';
const mongoose = require( 'mongoose' );

var accountSchema = mongoose.Schema( {
  username: String,
  firstName: String,
  lastName: String
} );

module.exports = mongoose.model( 'Account', accountSchema );
