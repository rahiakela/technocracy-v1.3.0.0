import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// subscription models declaration
export const subscriptionSchema: Schema = new Schema({
  email: { type: String, required: true },
  ipAddress: { type: String },
  city: { type: String },
  country: { type: String },
  notification: { type: String, required: true, default: 'N' },
  subscribedOn: { type: Date, required: true, default: Date.now() }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export {Subscription};