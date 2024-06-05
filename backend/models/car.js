import {Schema, model} from 'mongoose';

const CarSchema = new Schema (
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['disponible', 'en servicio', 'en mantenimiento'],
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
      virtuals: true,
      versionKey: false,
    },
  }
);

CarSchema.virtual ('id').get (function () {
  return this._id.toHexString ();
});

export default model ('Car', CarSchema);
