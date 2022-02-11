// -------------- server required ---------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//-------- for security authentication ---------------------
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

module.exports = {
  express,
  bodyParser,
  ejs,
  mongoose,
  session,
  passport,
  passportLocalMongoose,
  GoogleStrategy,
  findOrCreate,
};
