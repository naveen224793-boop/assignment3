// Task1: initiate app and run server at 3000

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Load environment variables from .env
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
// MongoDB connection string is loaded from environment variable MONGO_URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('FATAL: MONGO_URI environment variable is not set.\nPlease create a .env file in the project root (see .env.example) with:');
    console.error('MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/employeeDB?retryWrites=true&w=majority"');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
        console.log('Verify that MONGO_URI is correct and the network/whitelist settings allow connections from this host.');
        process.exit(1);
    });

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        console.log('API called: GET /api/employeelist');
        console.log('Mongoose connection state:', mongoose.connection.readyState);
        
        const employees = await Employee.find().maxTimeMS(20000);
        console.log('Found employees:', employees.length);
        
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error in GET /api/employeelist:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employees',
            error: error.message
        });
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employee',
            error: error.message
        });
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;
        
        // Validate required fields
        if (!name || !location || !position || !salary) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, location, position, salary) are required'
            });
        }

        const newEmployee = new Employee({
            name,
            location,
            position,
            salary
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: savedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating employee',
            error: error.message
        });
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully',
            data: deletedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting employee',
            error: error.message
        });
    }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {
    try {
        const { _id, name, location, position, salary } = req.body;
        
        // Validate required fields
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID is required for update'
            });
        }

        if (!name || !location || !position || !salary) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, location, position, salary) are required'
            });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            _id,
            { name, location, position, salary },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating employee',
            error: error.message
        });
    }
});


//! dont delete this code. it connects the front end file.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});