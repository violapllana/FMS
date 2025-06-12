// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('./models/User'); // ose rruga e saktë te modeli yt

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
 
// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });
// const GOOGLE_CLIENT_ID = "173061548428-2bvb3f3g52589nn0c8n2uq3prm2ofgd6.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";
// const FACEBOOK_CLIENT_ID="1209120783774324";
// const FACEBOOK_CLIENT_SECRET="003afe39017a01a7c52aecc408160f87";


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//    callbackURL: 'http://localhost:5000/api/auth/google/callback'
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     let user = await User.findOne({ email: profile.emails[0].value });
  
//     if (!user) {
//       user = await User.create({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         googleId: profile.id,
//         role: 'student',
//       });
//     } else if (!user.googleId) {
//       // Nëse ekziston por nuk ka googleId, e shtojmë
//       user.googleId = profile.id;
//       await user.save();
//     }
  
//     return done(null, user);
//   }));
//   passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_CLIENT_ID,
//     clientSecret: FACEBOOK_CLIENT_SECRET,
// callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'emails']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     const email = profile.emails?.[0]?.value;
//     let user = await User.findOne({ email });
  
//     if (!user) {
//       user = await User.create({
//         name: profile.displayName,
//         email,
//         facebookId: profile.id,
//         role: 'student',
//       });
//     } else if (!user.facebookId) {
//       // Nëse ekziston por nuk ka facebookId, e shtojmë
//       user.facebookId = profile.id;
//       await user.save();
//     }
  
//     return done(null, user);
//   }));
    
// require('dotenv').config(); // Kjo DUHET të jetë para përdorimit të process.env

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('./models/User');

// // Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:5000/api/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ email: profile.emails[0].value });
//     if (!user) {
//       user = await User.create({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         googleId: profile.id,
//         role: 'student',
//       });
//     } else if (!user.googleId) {
//       user.googleId = profile.id;
//       await user.save();
//     }
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// }));

// // Facebook Strategy (opsionale nëse e ke shtuar)
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
//   profileFields: ['id', 'displayName', 'emails']
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     const email = profile.emails?.[0]?.value;
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         name: profile.displayName,
//         email,
//         facebookId: profile.id,
//         role: 'student',
//       });
//     } else if (!user.facebookId) {
//       user.facebookId = profile.id;
//       await user.save();
//     }
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// }));

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });
