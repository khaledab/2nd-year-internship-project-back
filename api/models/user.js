const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  
  nom: String,
  username: String,
  password: String,
  email: String,
  adress: String,
  
});

module.exports = mongoose.model('Users', UserSchema);