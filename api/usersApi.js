import passport from './passportStrategySetup';
import { addRouteToSessionRouter } from "../router";
import User from '../datamodel/user';

addRouteToSessionRouter('/google/login', 'get',
    passport.authenticate('google', {
        scope: ["profile", "email"]
    })
);

addRouteToSessionRouter('/facebook/login', 'get',
passport.authenticate('facebook', {
    scope: ["public_profile", "email"]
}));

addRouteToSessionRouter('/google-callback', 'get', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
     res.redirect("http://localhost:3000/home");
})

addRouteToSessionRouter('/facebook-callback', 'get', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    res.redirect("http://localhost:3000/home");
})

addRouteToSessionRouter('/logout', 'post', async (req, res) => {
    if (req.user && req.user.id) {
        let loggedIn = true;
        const loggedInUser = await User.findOne({id: req.user.id});
    
        if (!loggedInUser || !loggedInUser.loggedIn) {
            loggedIn = false;
        } else {
            try {
                console.log('logout', loggedInUser);
                await loggedInUser.update({loggedIn: false});
            } catch(err) {
                loggedIn = true;
            }
            loggedIn = false;
        }
        if (!loggedIn) {
           req.logout(); // logouts the session
        }
        res.json({loginStatus: loggedIn});
    } else {
        res.json({loginStatus: false});
    }
})

addRouteToSessionRouter('/user-login-status', 'get', async (req, res) => {
    if (req.user && req.user.id) {
        res.json({loginStatus: true, userId: req.user.id}).status(200);
    } else {
        res.json({loginStatus: false}).status(200);
    }
})
