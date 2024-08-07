import mongoose, { Schema, model } from 'mongoose';

const clientSchema: Schema = new mongoose.Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true, unique: true },
  secondName: { type: String, required: true },
  email: { type: String, },
  kycPassed: { type: Boolean, default: false},
});

export const User = model('User', clientSchema);

