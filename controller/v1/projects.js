/*
*  Controller file containg CRUD methods for Project
*/

// Load the models
const Project = require('../../model/v1/Project');

// Async Handler
const asyncHandler = require('../../middleware/async');

// Error Response Handler
const ErrorResposne = require('../../utils/ErrorResponse');

/*
*  Endpoint:- GET /api/v1/projects
*  Purpose:- Gets all the projects
*  Access:- Public
*/
exports.getAllProjects = asyncHandler(async (req, res, next) => {
    
    // find the projects
    const projects = await Project.find();

    // Send response
    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});

/*
*  Endpoint:- GET /api/v1/projects/:id
*  Purpose:- Get a single project
*  Access:- Public
*/
exports.getSingleProject = asyncHandler(async (req, res, next) => {
    
    // find the project by id
    const project = await Project.findById(req.params.id);

    // if project does not exist
    if (!project) {
        return next(new ErrorResposne(`No project found with id ${req.params.id}`, 404));
    }

    // send response
    res.status(200).json({
        success: true,
        data: project
    });
});

/*
*  Endpoint:- POST /api/v1/projects
*  Purpose:- Create a new project
*  Access:- Private
*/
exports.addProject = asyncHandler(async (req, res, next) => {

    // get the user
    req.body.user = req.user.id;
    
    // create the project
    const project = await Project.create(req.body);

    // Send response
    res.status(201).json({
        success: true,
        data: project
    });
});

/*
*  Endpoint:- PUT /api/v1/projects/:id
*  Purpose:- Updates a project
*  Access:- Private
*/
exports.updateProject = asyncHandler(async (req, res, next) => {

    // find the project by id
    let project = await Project.findById(req.params.id);

    // if project does not exist
    if (!project) {
        return next(new ErrorResposne(`No project found with id ${req.params.id}`, 404));
    }

    // make sure only the owner of the project can update it
    if (project.user.toString() !== req.user.id) {
        return next(new ErrorResposne(`User with id ${req.user.id} is not authorised to update the project`, 401));
    }

    // update the project
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    // Send response
    res.status(200).json({
        success: true,
        data: project
    });
});

/*
*  Endpoint:- DELETE /api/v1/projects/:id
*  Purpose:- Deletes a project
*  Access:- Private
*/
exports.deleteProject = asyncHandler(async (req, res, next) => {

    // find the project by id
    const project = await Project.findById(req.params.id);

    // if project does not exist
    if (!project) {
        return next(new ErrorResposne(`No project found with id ${req.params.id}`, 404));
    }

    // make sure only the owner of the project can update it
    if (project.user.toString() !== req.user.id) {
        return next(new ErrorResposne(`User with id ${req.user.id} is not authorised to delete the project`, 401));
    }

    // remove the project
    await project.remove();

    // Send response
    res.status(200).json({
        success: true,
        data: {}
    });
});
