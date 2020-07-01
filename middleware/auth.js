/*
 * File to handle verify token and authorise and protect the routes
 */

// Dependencies
const jwt = require('jsonwebtoken');

// ErrorResponse Class
const ErrorResponse = require('../utils/ErrorResponse');

// Async Handler
const asyncHandler = require('./async');

// User Model
const User = require('../model/v1/User');

/** Function to protect the routes **/
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // get the token
    headersToken = req.headers.authorization;

    if (headersToken && headersToken.startsWith('Bearer')) {
        token = headersToken.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Unauthorised access', 401));
    }

    //verify toekn
    try {
        const decodedtoken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedtoken.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Unauthorised access', 401));
    }
}); 