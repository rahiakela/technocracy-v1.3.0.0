import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// defining article schema
export const questionSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  askedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, required: true, default: Date.now()},
  submittedOn: { type: Date, required: false },
  publishedOn: { type: Date, required: false },
  updatedOn: { type: Date, default: Date.now()},
  status: { type: String, required: true, default: 'pending'}, // pending,published,draft,on_hold,rejected and inactive
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  likes: { type: Array, default: []},
  tags: {type: Array, default: []},
  voteUp: { type: Array, ref: 'User' ,default: []},
  voteDown: { type: Array, ref: 'User', default: []},
});
// indexing blog's title and content for full text-search
// ref:https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose
questionSchema.index({ title: 'text' });

const Question = mongoose.model('Question', questionSchema);

export {Question};
