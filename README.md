# Employee App Backend

This is a MERN stack Employee Management System backend built with Node.js, Express.js, and MongoDB.

## Features

- Complete CRUD operations for employee management
- RESTful API endpoints
- MongoDB Atlas integration
- Error handling and validation
- Frontend integration ready

## API Endpoints

### GET /api/employeelist
- **Description**: Retrieve all employees
- **Method**: GET
- **Response**: Array of employee objects

### GET /api/employeelist/:id
- **Description**: Retrieve a single employee by ID
- **Method**: GET
- **Parameters**: `id` - Employee ID
- **Response**: Single employee object

### POST /api/employeelist
- **Description**: Add a new employee
- **Method**: POST
- **Request Body**: 
```json
{
  "name": "John Doe",
  "location": "New York",
  "position": "Software Developer",
  "salary": 75000
}
```

### PUT /api/employeelist
- **Description**: Update an existing employee
- **Method**: PUT
- **Request Body**: 
```json
{
  "_id": "employee_id_here",
  "name": "John Doe",
  "location": "California",
  "position": "Senior Developer",
  "salary": 85000
}
```

### DELETE /api/employeelist/:id
- **Description**: Delete an employee by ID
- **Method**: DELETE
- **Parameters**: `id` - Employee ID

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB Atlas
1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Edit the `.env` file and replace the placeholder with your actual MongoDB connection string:
```text
# .env
MONGO_URI="mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/employeeDB?retryWrites=true&w=majority"
```
The application reads the connection string from `process.env.MONGO_URI` (dotenv is used to load `.env`).

### 3. Run the Application
```bash
npm start
```

The server will start on http://localhost:3000

## Project Structure

```
├── app.js              # Main application file
├── package.json        # Project dependencies
├── dist/               # Frontend build files (do not modify)
└── README.md          # Project documentation
```

## Employee Schema

```javascript
{
  name: String (required),
  location: String (required),
  position: String (required),
  salary: Number (required, minimum: 0),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing

## Notes

- The frontend files are located in the `dist/Frontend` directory and should not be modified
- All API endpoints include proper error handling
- The application uses MongoDB timestamps for tracking creation and update times
- CORS is enabled for frontend integration

## Testing the APIs

You can test the APIs using tools like Postman, Thunder Client, or curl:

### Example: Add a new employee
```bash
curl -X POST http://localhost:3000/api/employeelist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "location": "Boston",
    "position": "Product Manager",
    "salary": 90000
  }'
```

### Example: Get all employees
```bash
curl http://localhost:3000/api/employeelist
```