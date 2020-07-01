/*
 *  Model for Project DB
 */

// Dependencies
const mongoose = require('mongoose');
const slugify = require('slugify');

// ProjectSchema
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a project name'],
        maxlength: [20, 'Project name cannot be more than 20 characters']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add some project description']
    },
    slug: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Run the slugify middleware to create the slug
ProjectSchema.pre('save', function () {
    this.slug = slugify(this.name, {
        lower: true
    });
    next();
});

// CASCADE DELETE - When a project is deleted, all its APIs should also get deleted automatically
ProjectSchema.pre('remove', async function (next) {
    await this.model('Api').deleteMany({ project: this._id }); 
});

// Export the model
module.exports = mongoose.model('Project', ProjectSchema);