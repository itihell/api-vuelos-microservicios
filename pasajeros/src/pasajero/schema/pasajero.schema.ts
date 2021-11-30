import { Schema } from 'mongoose';

export const PasajeroSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

PasajeroSchema.index({ email: 1 }, { unique: true });
