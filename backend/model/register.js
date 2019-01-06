var mongoose = require ('mongoose');
 
var registerSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    state: {type: String},
    city: {type: String}
})

var Register = mongoose.model('Register', registerSchema)   
module.exports = Register;