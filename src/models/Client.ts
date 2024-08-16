import mongoose, { Schema, model } from 'mongoose';

const clientSchema: Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true},
  country: { type: Object, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  kycPassed: { type: Boolean, default: false },
});

export const Client = model('Client', clientSchema);

