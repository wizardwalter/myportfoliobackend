const { json } = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const enviromentVariable = require("../enviroment_variables.json");

module.exports.createUser = (req, res, next) =>{
     bcrypt.hash(req.body.password, 10).then(hash => {
            const admin = new User({
              photo:req.file.filename,
              email: req.body.email,
              name: req.body.name,
              password: hash
            });
            admin
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created!",
                  result: result
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          });
    };

  module.exports.loginUser = (req,res,next) =>{
    console.log(req.body)
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed 1"
          });
        }
        fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password)
      })
          .then (result => {
              if (!result) {
                return res.status(401).json({
                  message: "Auth failed 2 "
                });
              }
              const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                enviromentVariable["jwt-secret"],
                { expiresIn: "10000" }
              );
              res.status(200).json({
                user: fetchedUser,
                token: token,
                expiresIn: "10000"
              });
            })
            .catch(err => {
              return res.status(401).json({
                message: "Auth failed 3",
                error: err
              });
            });
  };