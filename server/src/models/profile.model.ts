import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const employments: Schema = new Schema({
    company: { type: String},
    designation: { type: String},
    industry: { type: String},
    roles: { type: String},
    fromDate: { type: Date},
    toDate: { type: Date},
    achievements: { type: String},
    currentEmployer: {type: Boolean}
});

const experiences: Schema = new Schema({
    project: { type: String},
    fromDate: { type: Date},
    toDate: { type: Date},
    description: { type: String}
});

const skills: Schema = new Schema({
    skill: { type: String},
    experience: { type: Number},
    lastUsed: { type: Number},
    experienceLevel: { type: String}
});

const degrees: Schema = new Schema({
    qualification: { type: String},
    passingDate: { type: Date},
    university: { type: String},
    specialization: { type: String}
});

const certifications: Schema = new Schema({
    certification: { type: String},
    issuedBy: { type: String},
    issuedDate: { type: Date},
    lifetimeValidity: { type: Boolean}
});

// author models declaration
export const profileSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: {type: String},
  address: {type: String},
  city: {type: String},
  country: {type: String},
  portfolio: {
      dob: { type: Date},
      gender: { type: String},
      phone: { type: Number},
      email: { type: String},
      mobile: { type: Number},
      socialLink: {
          facebook: { type: String },
          twitter: { type: String },
          google: { type: String },
          linkedin: { type: String },
      }
  },
  employments: [employments],
  experiences: [experiences],
  skills: [skills],
  degrees: [degrees],
  certifications: [certifications],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Profile = mongoose.model('Profile', profileSchema);

export {Profile};
