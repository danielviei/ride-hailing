import {Schema, model} from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import {AuthenticationError} from '../errors.js';

const UserSchema = new Schema (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
      virtuals: true,
      versionKey: false,
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret._id;
      },
      virtuals: true,
      versionKey: false,
    },
  }
);

UserSchema.plugin (bcrypt);
UserSchema.virtual ('id').get (function () {
  return this._id.toHexString ();
});

UserSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne ({email});
  if (user) {
    const isMatch = await user.verifyPassword (password);
    if (isMatch) {
      return user;
    }
  }
  throw new AuthenticationError ('Autenticación fallida');
};

export default model ('User', UserSchema);
