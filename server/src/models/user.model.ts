import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// user models declaration
export const userSchema: Schema = new Schema({
  subscription: { type: String, required: true, default: 'N' },
  role: { type: String, required: true, default: 'user' }, // admin, author and user
  hash: { type: String },
  salt: { type: String },
  jwtToken: { type: String },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  local: {
      email: { type: String, unique: true },
      name: { type: String },
      image: { type: String },
      lastLogin: { type: Date, required: false, default: Date.now()},
      createdOn: { type: Date, required: true, default: Date.now() },
      active: { type: String, required: true, default: 'N' },
      activatedOn: { type: Date },
      activateToken: {
          token: { type: String },
          expires: { type: Date },
      },
  },
  facebook: {
      uid: { type: String, unique: true },
      token: { type: String },
      email: { type: String, unique: true },
      name: { type: String },
      image: { type: String },
      lastLogin: { type: Date, required: true, default: Date.now() },
      createdOn: { type: Date, required: true, default: Date.now() },
  },
  google: {
      uid: { type: String, unique: true },
      token: { type: String },
      email: { type: String, unique: true },
      name: { type: String },
      image: { type: String },
      lastLogin: { type: Date, required: true, default: Date.now() },
      createdOn: { type: Date, required: true, default: Date.now() },
  },
  twitter: {
      uid: { type: String, unique: true },
      token: { type: String },
      email: { type: String, unique: true },
      name: { type: String },
      image: { type: String },
      lastLogin: { type: Date, required: true, default: Date.now() },
      createdOn: { type: Date, required: true, default: Date.now() },
  },
  linkedin: {
      uid: { type: String, unique: true },
      token: { type: String },
      email: { type: String, unique: true },
      name: { type: String },
      image: { type: String },
      lastLogin: { type: Date, required: true, default: Date.now() },
      createdOn: { type: Date, required: true, default: Date.now() },
  },
});

userSchema.methods.setPassword = (password: string) => {
  this.salt = crypto.randomBytes(16).toString('hex'); // Create a random string for salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512'); // Create encrypted hash
};

userSchema.methods.validPassword = (password: string, user: any) => {
  const newHash = crypto
    .pbkdf2Sync(password, user.salt, 100000, 512, 'sha512')
    .toString('hex');
  return user.hash === newHash;
};

/*
* A JWT is used to pass data around, in our case between the API on
 the server and the SPA in the browser. A JWT can also be used by the server that generated
 the token to authenticate a user, when it’s returned in a subsequent request.
* */
userSchema.methods.generateJWT = (id: string, email: string, name: string) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // Create expiry date object and set for seven days

  // To generate a JWT, we simply need to call a sign method on the jsonwebtoken
  // library, sending the payload as a JSON object and the secret as a string.
  return jwt.sign(
    {
      // Call jwt.sign method and return what it returns
      _id: id, // Pass payload to method
      email: email,
      name: name,
      exp: parseInt('' + expiry.getTime() / 1000), // Including exp as Unix time in seconds
    },
    process.env.JWT_SECRET
  ); // Send secret for hashing algorithm to use
};

const User = mongoose.model('User', userSchema);

export {User};
