import passport from 'passport';
import { OAuth2Strategy as GoogleStategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../datamodel/user';
import credentials from '../config/credentials';

const createOrUpdateUser = async (accessToken, refreshToken, profile, done) => {
    const user = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        middleName: profile.name.middleName,
        name: profile.displayName,
        id: profile.id,
        email: profile.emails[0].value,
        accessToken: accessToken,
        provider: profile.provider,
        loggedIn: true
    }
    
    const userFromDB = await User.updateOrCreate(user);
   
    done(null, userFromDB);
}

passport.serializeUser(async (user, done) => {
    console.log('serializeUser', user);
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser', id);
    try {
        const userFromDb = await User.findOne({id});
        if (!userFromDb || !userFromDb.loggedIn) {
            return done(null, false);
        } else {
            return done(null, userFromDb);
        }
    } catch(err) {
        console.log('userFromDb error', err);
        return done(err);
    }
});

/**
 * Google auth setup
 */
passport.use(new GoogleStategy({
    clientID: credentials.google.clientID,
    clientSecret: credentials.google.clientSecret,
    callbackURL: '/session/google-callback',
}, createOrUpdateUser
));

// passport.use(new BearerStrategy(function(token, done) {
//     console.log('Bearer', token);
//     User.findOne({accessToken: token}, (err, user) => {
//         if (err) {
//             return done(err);
//         } else if (!user) {
//             return done(null, false);
//         } else {
//             return done(null, user);
//         }
//     })
// }));

/**
 * Facebook auth setup
 */

passport.use(new FacebookStrategy({
    clientID: credentials.facebook.clientID,
    clientSecret: credentials.facebook.clientSecret,
    callbackURL: '/session/facebook-callback',
    profileFields: ['id', 'first_name', 'last_name', 'middle_name', 'displayName', 'email']
  }, createOrUpdateUser
));

export default passport;