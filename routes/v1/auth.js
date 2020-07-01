/*
 *  Authentication API for User routes
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });

// Get the controller methods
const { 
    registerUser,
    loginUser,
    getMe
} = require('../../controller/v1/auth');

// Protect Middleware
const { protect } = require('../../middleware/auth');

// Route to specific endpoints
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

// Export the router
module.exports = router; 