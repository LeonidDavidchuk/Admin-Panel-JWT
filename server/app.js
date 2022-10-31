const http = require('http');
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const dbConnect = require('./db/dbConnect');
const app = express();
const port = 3000;
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./db/userModel");
const auth = require("./auth")
const cors = require('cors');
const { body, validationResult } = require('express-validator');




app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get("/", (req, res) => {

  res.send("Hello World!");
})


// register endpoint
app.post("/register", body('login').isLength({min: 4, max: 15}), body('password').isLength({min: 5, max: 20}), (request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        login: request.body.login,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});


// login endpoint
app.post("/login", (request, response) => {
  // check if login exists
  User.findOne({ login: request.body.login })

    // if login exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userLogin: user.login,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            login: user.login,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if login does not exist
    .catch((e) => {
      response.status(404).send({
        message: "login not found",
        e,
      });
    });
});

//free endpoint
app.get("/free-endpoint", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (req, res) => {
  res.json({ message: "You are authorized to access me" });
});


app.listen(port, () => {
  console.log(`Server is running on http://:${port}`)
})

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


