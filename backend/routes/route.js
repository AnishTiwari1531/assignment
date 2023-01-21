const express = require('express');
const { login, register, logout } = require("../models/userModel.js");

const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)



router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);


router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);



module.exports = router