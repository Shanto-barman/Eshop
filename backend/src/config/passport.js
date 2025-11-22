import {Strategy as GoogleStrategy} from "passport-google-oauth20";
// import pkg from "passport-google-oauth20";
// const { Strategy: GoogleStrategy } = pkg;

import passport from "passport";
import { User } from "../module/user/model/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback"
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1) user already exists?
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // create new user only if not exists
            user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: "", // google user no password
            provider: "google",
            avatar: profile.photos[0].value,
            isLoggedIn:true,
            isVerified:true
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);



// import {Strategy as GoogleStrategy} from "passport-google-oauth20";
// // import pkg from "passport-google-oauth20";
// // const { Strategy: GoogleStrategy } = pkg;

// import passport from "passport";
// import { User } from "../module/user/model/userModel.js";

// passport.use(
//     new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:8000/auth/google/callback"
//   },
//   async(accessToken, refreshToken, profile, cb)=> {
//     console.log(profile)
//     try{
//        let user =await User.findOne({ googleId: profile.id } );

//        if(!user){
//          user = await User.create({
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             googleId:profile.id,
//             username:profile.displayName,
//             email:profile.emails[0].value,
//             avatar:profile.photos[0].value,
//             password: "", // google user no password
//             provider: "google",
//             isLoggedIn:true,
//             isVerified:true, 
//         })
//        }

//        return cb(null, user);

//     }catch(error){
//        return cb(error, null)
//     }
    
//   }
// ));