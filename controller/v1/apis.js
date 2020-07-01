/*
 *  Controller file containg CRUD methods for Api
 */

// Load the models
const Api = require('../../model/v1/Api');
const Project = require('../../model/v1/Project');

// Async Handler
const asyncHandler = require('../../middleware/async');

// Error Response Handler
const ErrorResposne = require('../../utils/ErrorResponse');

/*
 *  Endpoint - 1:- GET /api/v1/apis (Gets all the apis)
 *  Endpoint - 2:- GET /api/v1/projects/:projectId/apis (Gets all apis under a specific project)
 *  Purpose:- Gets all the projects
 *  Access:- Public
 */
exports.getAllApis = asyncHandler(async (req, res, next) => {

    // check if the projectId is passed, if yes call the second endpoint
    if (req.params.projectId) {

        // search for apis under a specific project
        const apis = await Api.find({
            project: req.params.projectId
        });

        // send response
        res.status(200).json({
            success: true,
            count: apis.length,
            data: apis
        });
    } else {

        // search all the apis
        const apis = await Api.find();

        // send response
        res.status(200).json({
            success: true,
            count: apis.length,
            data: apis
        });
    }
});

/*
 *  Endpoint:- GET /api/v1/apis/:id
 *  Purpose:- Gets a single api
 *  Access:- Public
 */
exports.getSingleApi = asyncHandler(async (req, res, next) => {

    // search for api by id
    const api = await Api.findById(req.params.id).populate({
        path: 'project',
        'select': 'name'
    });

    // if api does not exist
    if (!api) {
        return next(new ErrorResposne(`No API found with id ${req.params.id}`, 404));
    }

    // else, send the response
    res.status(200).json({
        success: true,
        data: api
    });
});


/*
 *  Endpoint:- POST /api/v1/projects/:projectId/apis
 *  Purpose:- Add a new api under a project
 *  Access:- Private
 */
exports.addApi = asyncHandler(async (req, res, next) => {

    // get the projectId
    req.body.project = req.params.projectId;

    // get the userId
    req.body.user = req.user.id;

    // search for the project
    const project = await Project.findById(req.params.projectId);

    // if project does not exist
    if (!project) {
        return next(new ErrorResposne(`No project found with id ${req.params.projectId}`, 404));
    }

    // make sure only the owner of the project can add a new api to it
    if (project.user.toString() !== req.user.id) {
        return next(new ErrorResposne(`User with id ${req.user.id} is not authorised to add an API to this project`, 401));
    }

    // create the api
    const api = await Api.create(req.body);

    // send response 
    res.status(201).json({
        success: true,
        data: api
    });
})

/*
 *  Endpoint:- PUT /api/v1/apis/:id
 *  Purpose:- Updates an existing api
 *  Access:- Private
 */
exports.updateApi = asyncHandler(async (req, res, next) => {

    // search for api by id
    let api = await Api.findById(req.params.id);

    // if api does not exist
    if (!api) {
        return next(new ErrorResposne(`No API found with id ${req.params.id}`, 404));
    }

    // make sure only the owner of the project can update the api to it
    if (api.user.toString() !== req.user.id) {
        return next(new ErrorResposne(`User with id ${req.user.id} is not authorised to update the API to this project`, 401));
    }

    // update the API
    api = await Api.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    // send response 
    res.status(200).json({
        success: true,
        data: api
    });
});

/*
 *  Endpoint:- DELETE /api/v1/apis/:id
 *  Purpose:- Deletes an existing api
 *  Access:- Private
 */
exports.deleteApi = asyncHandler(async (req, res, next) => {

    // search for api by id
    let api = await Api.findById(req.params.id);

    // if api does not exist
    if (!api) {
        return next(new ErrorResposne(`No API found with id ${req.params.id}`, 404));
    }

    // make sure only the owner of the project can delete the api to it
    if (api.user.toString() !== req.user.id) {
        return next(new ErrorResposne(`User with id ${req.user.id} is not authorised to delete the API to this project`, 401));
    }

    // remove the api
    await api.remove();

    // send response 
    res.status(200).json({
        success: true,
        data: {}
    });
});