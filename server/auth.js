const { response } = require("express");
const { request } = require("http");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // get the token from the authorization header
        const token = await request.headers.authorization.split(" ")[1];

        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

        //retrieve the user details of the logged in user
        const user = await decodedToken;

        //pass the user down to the endpoints here
        request.user = user;

        next();
        
    } catch (error) {
        response.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
}