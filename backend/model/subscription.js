var mongoose = require('mongoose');

var subscriptionSchema = new mongoose.Schema({
   endpoint : { type: String },
  expirationTime : { type: Date },
   keys : { type: Object },
})

var Subscription = mongoose.model('Subscription', subscriptionSchema)
module.exports = Subscription;
