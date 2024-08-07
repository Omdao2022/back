import mongoose, { Schema, model } from 'mongoose';

const Client: Schema = new mongoose.Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true, unique: true },
  secondName: { type: String, required: true },
  email: {},
  password: {},
  kycPassed: {},
});

