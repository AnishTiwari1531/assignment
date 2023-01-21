const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID ="68192206506-snpismvfpbnnorrckomj07e7gd65al4q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "3399482913659655";
FACEBOOK_APP_SECRET = "e4d8e32eea49c6336f28eae74136963a";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);


passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
