import {Schema, model} from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

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

export default model ('User', UserSchema);
