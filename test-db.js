// Test script to add employee data directly
const mongoose = require('mongoose');
// Load environment variables from .env
require('dotenv').config();

// MongoDB connection string should be provided via environment variable MONGO_URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI is not set. Create a .env file or set the environment variable before running this script. See .env.example.');
    process.exit(1);
}

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

async function testAddEmployee() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Atlas successfully!');

        console.log('Adding test employee...');
        const testEmployee = new Employee({
            name: 'Test Employee',
            location: 'Test City',
            position: 'Test Developer',
            salary: 50000
        });

        const savedEmployee = await testEmployee.save();
        console.log('Employee added successfully:', savedEmployee);

        // Test fetching all employees
        console.log('Fetching all employees...');
        const allEmployees = await Employee.find();
        console.log('All employees:', allEmployees);

        await mongoose.connection.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('Error:', error);
        await mongoose.connection.close();
    }
}

testAddEmployee();