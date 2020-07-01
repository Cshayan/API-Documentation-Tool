/*
 *  CRUD API for Api routes
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });

// Get the controller methods
const {
    getAllApis,
    getSingleApi,
    addApi,
    updateApi,
    deleteApi
} = require('../../controller/v1/apis');

// Protect Middleware
const { protect } = require('../../middleware/auth');

// Route to specific endpoints
router.route('/').get(protect, getAllApis).post(protect, addApi);
router.route('/:id').get(protect, getSingleApi).put(protect, updateApi).delete(protect, deleteApi);

// Export the router
module.exports = router;