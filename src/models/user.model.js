const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: "Users"
});

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, 'secret', {
    expiresIn: '1d',
  });
  return token;
};
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, 'secret', {
    expiresIn: '7d',
  });
  return token;
};
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
