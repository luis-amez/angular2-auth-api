const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
