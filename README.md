# 📚 Course Selling API

A robust and secure RESTful API for managing an online course selling platform. This API enables users to browse courses, make purchases, and allows administrators to manage course listings efficiently.

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication system
- 👥 **User Management** - User registration and login functionality
- 📖 **Course Management** - Browse and view available courses
- 💳 **Purchase System** - Course purchasing with payment tracking
- 🛡️ **Secure Routes** - Protected endpoints with middleware authentication
- 📊 **MongoDB Integration** - Efficient data storage with Mongoose ODM
- ✅ **Input Validation** - Request validation using Zod schemas

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Object Data Modeling (ODM)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **dotenv** - Environment variable management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashwatniranjan-max/Course-Selling-API.git
   cd Course-Selling-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   JWT_SECRET=your-secret-key-here
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Start the server**
   ```bash
   node index.js
   ```

   The server will start on `http://localhost:3000` (or the port specified in your `.env` file)

## 🔌 API Endpoints

### User Routes (`/user`)

#### Sign Up
- **POST** `/user/signup`
- **Description**: Register a new user account
- **Body**: `{ "name": string, "email": string, "password": string }`

#### Sign In
- **POST** `/user/signin`
- **Description**: Authenticate and login user
- **Body**: `{ "email": string, "password": string }`
- **Response**: Returns JWT token for authenticated requests

#### Get Purchases
- **GET** `/user/purchases`
- **Description**: Retrieve user's purchase history
- **Headers**: `token: <JWT_TOKEN>`

### Course Routes (`/course`)

#### Get All Courses
- **GET** `/course`
- **Description**: Retrieve list of all available courses
- **Public**: No authentication required

#### Preview Course
- **GET** `/course/preview`
- **Description**: Preview course details
- **Headers**: `token: <JWT_TOKEN>`

#### Purchase Course
- **POST** `/course/purchase`
- **Description**: Purchase a course
- **Headers**: `token: <JWT_TOKEN>`
- **Body**: `{ "courseId": string }`

### Protected Routes

#### Get Current User Info
- **GET** `/me`
- **Description**: Get authenticated user's information
- **Headers**: `token: <JWT_TOKEN>`

## 🗄️ Database Schema

### User Schema
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `createdAt`, `updatedAt` - Timestamps

### Admin Schema
- `name` - Admin's name
- `email` - Unique email address
- `password` - Hashed password
- `role` - Admin role (admin/superadmin)
- `createdAt`, `updatedAt` - Timestamps

### Course Schema
- `title` - Course title
- `description` - Course description
- `price` - Course price
- `imageUrl` - Course image URL
- `url` - Course content URL
- `published` - Publication status
- `createdBy` - Reference to Admin ID
- `createdAt`, `updatedAt` - Timestamps

### Purchase Schema
- `userId` - Reference to User ID
- `courseId` - Reference to Course ID
- `amount` - Purchase amount
- `paymentStatus` - Status (pending/completed/failed/refunded)
- `paymentMethod` - Payment method used
- `transactionId` - Transaction identifier
- `purchasedAt` - Purchase timestamp

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Sign up or sign in to receive a JWT token
2. Include the token in the request headers:
   ```
   headers: {
     "token": "your-jwt-token-here"
   }
   ```

## 📁 Project Structure

```
Course-Selling-API/
├── index.js          # Main application entry point
├── db.js             # Database models and schemas
├── auth.js           # Authentication middleware
├── courseRoute.js    # Course-related routes
├── userRoute.js      # User-related routes
├── package.json      # Project dependencies
└── .env             # Environment variables (not committed)
```

## 🚀 Usage Examples

### Register a New User
Send a POST request to `/user/signup` with user details.

### Browse Courses
Send a GET request to `/course` to see all available courses.

### Purchase a Course
Authenticate first, then send a POST request to `/course/purchase` with the course ID.

## 🔐 Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for secure authentication
- Input validation using Zod schemas
- Protected routes with authentication middleware

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📄 License

ISC License

## 👤 Author

Built with ❤️ for learning and development

---

**Note**: Make sure to set up your MongoDB connection string and JWT secret in the `.env` file before running the application.
