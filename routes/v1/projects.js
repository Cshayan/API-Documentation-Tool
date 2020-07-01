/*
 *  CRUD API for Project routes
 */

// Dependencies
const express = require('express');
const router = express.Router();

// Get the controller methods
const {
    getAllProjects,
    getSingleProject,
    addProject,
    updateProject,
    deleteProject
} = require('../../controller/v1/projects');

// Bring in the resource router
const apiRouter = require('./apis');

// Re-route the resource routers
router.use('/:projectId/apis', apiRouter);

// Protect Middleware
const { protect } = require('../../middleware/auth');

// Route to specific endpoints
router.route('/').get(getAllProjects).post(protect, addProject);

router.route('/:id').get(getSingleProject).put(protect, updateProject).delete(protect, deleteProject);

// Export the router
module.exports = router;