var express = require('express');
var router = express.Router();
const User = require("../models/usermodel");
const passport = require("passport");
const nodemailer = require('nodemailer');
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('./auth/signup', { title: 'Express' });
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const user = await User.register(new User({ username, email }), password);
      res.send('User registered successfully <a href="/login">Login back </a>');
  } catch (err) {
      res.status(400).send(err.message);
  }
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login', { title: 'Express' });
});

router.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/viewfood",
      failureRedirect: "/login",
  }),
  function (req, res, next) {}
);

router.get('/viewfood', function(req, res, next) {
  res.render('./food/viewfood', { title: 'Express' });
});

router.get('/forget', async (req, res) => {
  res.render('./auth/forgetpassword');
});

router.post('/forget', async (req, res) => {
  const { email } = req.body;
  try {
    await sendMail(email, res);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

function sendMail(email, res) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "chitra64@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "Chitra Pvt. Ltd. <chitra64@gmail.com>",
    to: email,
    subject: "Password Reset Link",
    html: 'This is Test Mail',
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) return res.send(err);
    console.log(info);
    return res.send(
      "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
    );
  });
}

module.exports = router;
