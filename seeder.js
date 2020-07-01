/*
 Script for automatically importing or deleting data from DB
*/

// All Dependencies
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load ENV file
dotenv.config({
    path: './config/config.env'
});

// Load the models
const Project = require('./model/v1/Project');
const Api = require('./model/v1/Api');
const User = require('./model/v1/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Read the JSON file
const projectData = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf-8'));
const apiData = JSON.parse(fs.readFileSync(`${__dirname}/_data/apis.json`, 'utf-8'));
const userData = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import data to DB
const immportData = async () => {
    try {
        await Project.create(projectData);
        await Api.create(apiData);
        await User.create(userData);

        console.log('Data Imported successfully...'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

// Delete data from DB
const deleteData = async () => {
    try {
        await Project.deleteMany();
        await Api.deleteMany();
        await User.deleteMany();

        console.log('Data deleted successfully'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

/* Call the functions according to argument provided */
/* 
 -i stands for import
 -d stands for delete 
*/
if (process.argv[2] === '-i') {
    immportData();
} else if (process.argv[2] === '-d') {
    deleteData();
}