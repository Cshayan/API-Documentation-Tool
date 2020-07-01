/*
 *  Model for API DB
 */

// Dependencies
const mongoose = require('mongoose');

// APISchema
const ApiSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a API name']
    },
    description: {
        type: String,
        trim: true,
    },
    endpoint: {
        type: String,
        required: [true, 'Please add an API endpoint'],
        trim: true,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    method: {
        type: String,
        required: [true, 'Please add a HTTP method'],
        trim: true,
        enum: [
            'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD'
        ]
    },
    header: {
        type: Object,
        required: [true, 'Please add header body'],
        trim: true,
        param: {
            type: [String]
        },
        value: {
            type: [String]
        } 
    },
    request: {
        type: Object,
        required: [true, 'Please add a request body'],
        trim: true,
        param: {
            type: [String]
        },
        value: {
            type: [String]
        }
    },
    response: {
        type: Object,
        required: [true, 'Please add a response body'],
        trim: true,
        param: {
            type: [String]
        },
        value: {
            type: [String]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Export the model
module.exports = mongoose.model('Api', ApiSchema);