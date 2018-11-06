import {NextFunction, Request, Response} from "express";
import {Profile} from "../models/profile.model";
import {User} from "../models/user.model";

/**
 * @class ProfileController: Define user profile related operation like fetching/saving/updating/deleting profile etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class ProfileController {

    /**
     * Get profile against user id.
     * @response: return json of profile
     */
    public getProfile(req: Request, res: Response, next: NextFunction) {
        //getting user id from http request
        let userId=req.params['userId'];

        //Validate that required fields have been supplied
        if(!userId){
            this.validationError(res, next, '[user id]');
        }

        Profile.findOne({"user" : userId})
            .exec()
            .then((profile: any) => {
                if(profile){ //if profile found then return this profile
                    res.json({"statusCode": 200, 'profile': profile});
                } else {
                    res.json({"statusCode": 404, message: `The profile does not exist for ${userId}`});
                }
                next();
            })
            .catch(next);
    }

    /**
     * Save profile by updating user id.
     * @response: return json of newly added profile
     */
    public saveProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.params['userId'];

        let newProfile = new Profile();

        //Validate that required fields have been supplied
        if(!userId){
           this.validationError(res, next, '[user id]');
        }

        //Create a new Profile instance and set its properties
        const profileToSave = ProfileController.getBakedProfile(userId, req.body.data);

        //Save this Profile to MongoDB
        Object.assign(newProfile, profileToSave)
            .save()
            .then((profile) => {
                ProfileController.updateUser(userId, profile._id);
                res.json({"statusCode": 200, 'profile': profile});
                next();
            })
            .catch(next);
    }


    /**
     * Update profile by profile id.
     * @response: return json of updated profile
     */
    public updateProfile(req: Request, res: Response, next: NextFunction) {

        const profileId = req.params['userId'];

        //Validate that required fields have been supplied
        if(!profileId){
            this.validationError(res, next, '[profile id]');
        }

        // Step 1: load profile using profile id
        Profile.findById(profileId)
            .then((profile: any) => {
                // Step 2: update loaded profile by merging with supplied profile data and return to next callback
                return ProfileController.getMergedProfile(profile, req.body.data);
            })
            .then(mergedProfile => {
                // Step 3: Finally, update profile with updated merged profile into mongodb
                Profile.findOneAndUpdate(
                    {"_id" : profileId},
                    mergedProfile,
                    {new: true}
                )
                .then((updatedProfile) => {
                    //Step 4: return updated profile
                    res.json({"statusCode": 200, 'profile': updatedProfile});
                    next();
                })
                .catch(next);
            })
            .catch(next);
    }

    /**
     * Update profile's image using by profile id and user instance.
     * @response: return json of updated user
     */
    public updateProfileImage(req: Request, res: Response, next: NextFunction) {
        const userId = req.params['userId'];

        //Validate that required fields have been supplied
        if(!userId || !req.body){
            this.validationError(res, next, '[user id, user]');
        }

        // find and update user with id and populate with profile
        User.findOneAndUpdate(
                {"_id": userId},   // query criteria
                req.body,                    // data to update
                {new: true}          // options: return updated one
            )
            .populate("profile")   // populate profile instance
            .then((returnUser: any) => {
                // clear hash and salt value
                returnUser.salt = "";
                returnUser.hash = "";
                res.json(returnUser);
                next();
            })
            .catch(next);
    }

    /**
     * Delete profile using by profile id.
     * @response: return json of deleted message
     */
    public deleteProfile(req: Request, res: Response, next: NextFunction) {
        const profileId = req.params['profileId'];

        //Validate that required fields have been supplied
        if(!profileId){
            this.validationError(res, next, '[profile id]');
        }

        Profile.findByIdAndRemove(profileId)
            .then((profile) => {
                res.json({"statusCode":200,message:"Profile deleted"});
                next();
            })
            .catch(next);
    }

    private validationError(res: Response, next: NextFunction, ...params: string[]) {
        res.json({
            statusCode: 400,
            message: `Fields ${params} must be required`,
        });
        next();
        return;
    }

    private static getBakedProfile(userId: string, data: any): any {
        let profile: any;

        //Create Profile instance and set its properties based on profile action type
        switch (data.action) {
            case 'portfolio':
                profile = {
                    "name": data.portfolio.name,
                    "description": data.portfolio.description,
                    "address": data.portfolio.address,
                    "city": data.portfolio.city,
                    "country": data.portfolio.country,
                    "portfolio": {
                        "dob": data.portfolio.portfolio.dob,
                        "gender": data.portfolio.portfolio.gender,
                        "phone": data.portfolio.portfolio.phone,
                        "email": data.portfolio.portfolio.email,
                        "mobile": data.portfolio.portfolio.mobile,
                        "socialLink": {
                            "facebook": data.portfolio.portfolio.socialLink.facebook,
                            "twitter": data.portfolio.portfolio.socialLink.twitter,
                            "google": data.portfolio.portfolio.socialLink.google,
                            "linkedin": data.portfolio.portfolio.socialLink.linkedin,
                        }
                    },
                    "user": userId
                };
                break;
            case 'employment':
                const employments: any[] = [];
                for (let i = 0; i < data.employments.length; i++) {
                    const emp = data.employments[i];
                    const employment = {
                        "company": emp.company,
                        "designation": emp.designation,
                        "industry": emp.industry,
                        "role": emp.role,
                        "fromDate": emp.fromDate,
                        "toDate": emp.toDate,
                        "achievement": emp.achievement,
                        "currentEmployer": emp.currentEmployer
                    };
                    employments.push(employment);
                }
                profile = {
                    "employment": [employments],
                    "user": userId
                };
                break;
            case 'experience':
                const experiences: any[] = [];
                for (let i = 0; i < data.experiences.length; i++) {
                    const exp = data.experiences[i];
                    const experience = {
                        "project": exp.project,
                        "workedFrom": exp.workedFrom,
                        "workedTo": exp.workedTo,
                        "description": exp.description
                    };
                    experiences.push(experience);
                }
                profile = {
                    "experiences": [experiences],
                    "user": userId
                };
                break;
            case 'skills':
                const skills: any[] = [];
                for (let i = 0; i < data.skills.length; i++) {
                    const skl = data.skills[i];
                    const skill = {
                        "skillSet": skl.skillSet,
                        "experience": skl.experience,
                        "lastUsed": skl.lastUsed,
                        "experienceLevel": skl.experienceLevel
                    };
                    skills.push(skill);
                }
                profile = {
                    "skills": [skills],
                    "user": userId
                };
                break;
            case 'education':
                const degrees: any[] = [];
                const certifications: any[] = [];
                for (let i = 0; i < data.education.degrees.length; i++) {
                    const deg = data.education.degrees[i];
                    const degree = {
                        "qualification": deg.qualification,
                        "passingYear": deg.passingYear,
                        "instituteUniversity": deg.instituteUniversity,
                        "specialization": deg.specialization
                    };
                    degrees.push(degree);
                }
                for (let i = 0; i < data.education.certifications.length; i++) {
                    const cert = data.education.certifications[i];
                    const certification = {
                        "name": cert.name,
                        "issuedBy": cert.issuedBy,
                        "validity": cert.validity,
                        "lifetimeValidity": cert.lifetimeValidity
                    };
                    certifications.push(certification);
                }

                profile = {
                    "education": {
                        "degrees": [degrees],
                        "certifications": [certifications]
                    },
                    "user": userId
                };
                break;
        }

        return profile;
    }

    private static getMergedProfile(profile: any, data: any): any {

        //Update Profile instance and set its properties value if it is supplied, based on profile action type
        switch (data.action) {
            case 'portfolio':
                Object.assign(profile, data.portfolio);
                break;
            case 'employment':
                for (let i = 0; i < data.employments.length; i++) {
                    profile.employments.push(data.employments[i]);
                }
                break;
            case 'experience':
                for (let i = 0; i < data.experiences.length; i++) {
                    profile.experiences.push(data.experiences[i]);
                }
                break;
            case 'skills':
                for (let i = 0; i < data.skills.length; i++) {
                    profile.skills.push(data.skills[i]);
                }
                break;
            case 'education':
                for (let i = 0; i < data.degrees.length; i++) {
                    profile.degrees.push(data.degrees[i]);
                }
                for (let i = 0; i < data.certifications.length; i++) {
                    profile.certifications.push(data.certifications[i]);
                }
                break;
        }

        return profile;
    }

    private static updateUser(userId: string, profileId: string) {
        User.findOneAndUpdate(
            {"_id" : userId},
            {"profile": profileId},
            {new: true}
        )
        .then((updatedUser) => {
            console.log('User updated with profile id...');
        })
        .catch(error => console.log(error));
    }
}