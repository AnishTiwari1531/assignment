const express = require('express');
const cookieSession = require('cookie-session')
const app = express();
const multer = require("multer")
const cors = require('cors');
const passportSetup = require("./passport");
const passport = require("passport");
const authRoutes = require('./routes/route');
app.use(multer().any())

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());



app.use(
  cookieSession({ name: "session", keys: ["Vola"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("API working!");
});

