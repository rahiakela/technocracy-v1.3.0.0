import { Schema } from 'mongoose';
import mongoose = require('mongoose');

// mongoose.set('debug', true);

// blog models schema declaration
export const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false, default: '' },
  content: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  createdOn: { type: Date, required: true, default: Date.now() },
  submittedOn: { type: Date, required: false },
  publishedOn: { type: Date, required: false },
  holdOnDate: { type: Date, required: false },
  inactiveDate: { type: Date, required: false },
  rejectedOn: { type: Date, required: false },
  updatedOn: { type: Date, required: false },
  image: { type: String, required: false, default: '' },
  status: { type: String, required: true, default: 'pending' }, // pending,published,draft,on_hold,inactive and rejected
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  tags: { type: Array, default: []}
});

// indexing blog's title and content for full text-search
// ref:https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose
blogSchema.index({ title: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

export {Blog};
