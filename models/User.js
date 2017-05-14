const mongoose = require('mongoose');
// Bcrypt for hashing passwords
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  local            : {
    username: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    businessName: {
      type: String,
    },
    abn: {
      type: Number,
    },
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// Allow access to User model outside of this file
const User = module.exports = mongoose.model('User', userSchema);
