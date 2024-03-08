var express = require('express');
var router = express.Router();
const User = require("../models/usermodel");
const passport = require("passport");
const nodemailer = require('nodemailer');
const LocalStrategy = require("passport-local");
const Seller=require('../models/sellermodel')
const bcrypt = require('bcrypt');
router.get('/buyer-profile', async (req, res) => {
    try {
        // Check if the user is authenticated (i.e., if userId is stored in the session)
        if (!req.session.userId) {
            // If user is not authenticated, redirect to login page
            return res.redirect("/login");
        }

        // Fetch the buyer details using the stored userId
        const buyer = await User.findById(req.session.userId);

        // Render the buyer profile page with the buyer details
        res.render('buyerprofile', { buyer });
    } catch (error) {
        // Handle errors
        console.error("Error fetching buyer details:", error);
        res.status(500).send("Internal server error");
    }
});

router.get('/seller-profile', async (req, res) => {
    try {
        // Check if the user is authenticated (i.e., if userId is stored in the session)
        if (!req.session.userId) {
            // If user is not authenticated, redirect to login page
            return res.redirect("/login");
        }

        // Fetch the buyer details using the stored userId
        const buyer = await User.findById(req.session.userId);

        // Render the buyer profile page with the buyer details
        res.render('sellerprofile', { seller });
    } catch (error) {
        // Handle errors
        console.error("Error fetching buyer details:", error);
        res.status(500).send("Internal server error");
    }
});
module.exports=router