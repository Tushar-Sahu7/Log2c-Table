# Full Stack Login & Registration System

A complete authentication system built with React.js and Node.js, featuring user registration, login, protected routes, and a beautiful dashboard with user management table.

[GitHub Repository](https://github.com/Tushar-Sahu7/Log2c-Table)

## ✨ Features

### Authentication
- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Remember Me functionality
- ✅ Password validation (minimum 8 characters)
- ✅ Email validation
- ✅ Protected routes
- ✅ Secure password hashing with bcrypt

### Dashboard
- ✅ Beautiful Material-UI table
- ✅ User list with avatars
- ✅ Pagination (5/10/25/50 rows per page)
- ✅ Role-based display (Admin, Publisher, Reviewer, Moderator)
- ✅ Status indicators (Active, Inactive, Suspended)
- ✅ Action buttons (Settings, Delete) //In progress
- ✅ Responsive design
- ✅ Logout functionality

### Design
- ✅ Modern green-themed UI
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Tailwind CSS styling
- ✅ Material-UI components
- ✅ Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router v7** - Client-side routing
- **Axios** - HTTP requests
- **Tailwind CSS** - Utility-first CSS
- **Material-UI** - Component library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tushar-Sahu7/Log2c-Table.git
cd Log2c-Table
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=7777
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**MongoDB Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/user_auth_db
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Seed Database (Optional)

To populate the database with 100 dummy users:

```bash
cd backend
node seed.js
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:7777
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## 📁 Project Structure

```
Log2c-Table/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Auth logic
│   ├── models/
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── user.js               # User routes
│   ├── .env                      # Environment variables
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios instance
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   └── tailwind.config.js
│
└── README.md
```

## 🔑 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/users` | Get all users |

### Request/Response Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "dob": "1990-01-15",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "dob": "1990-01-15"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response: Same as registration
```

## 🎨 Screenshots

### Login Page
- Clean, modern design with green theme
- Email and password validation
- Remember me functionality
- Forgot password placeholder

### Registration Page
- Multi-field form (Name, DOB, Email, Password, Confirm Password)
- Real-time validation
- Password strength requirements

### Dashboard
- Material-UI data table
- Random avatar images
- Status chips with colors
- Pagination controls
- Logout functionality

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ Input validation (frontend & backend)
- ✅ SQL injection prevention (MongoDB/Mongoose)
- ✅ XSS protection
- ✅ CORS configuration

## 📝 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/user_auth_db
JWT_SECRET=your_secret_key_here
PORT=7777
```

## 🧪 Testing

### Test Registration
1. Navigate to `/register`
2. Fill in all fields
3. Submit form
4. Should redirect to dashboard

### Test Login
1. Navigate to `/login`
2. Enter registered credentials
3. Check "Remember me" (optional)
4. Submit form
5. Should redirect to dashboard

### Test Protected Route
1. Try accessing `/dashboard` without login
2. Should redirect to `/login`
3. Login and verify dashboard access

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Check your `MONGO_URI` in `.env` file and ensure MongoDB Atlas IP whitelist includes your IP.

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Ensure `app.use(cors())` is added in `server.js` before routes.

### JWT Token Invalid
```
JsonWebTokenError: invalid token
```
**Solution:** Clear localStorage and login again, or check `JWT_SECRET` matches in `.env`.

## 📦 Dependencies

### Backend
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^17.2.3",
  "cors": "^2.8.5"
}
```

### Frontend
```json
{
  "react": "^19.1.1",
  "react-router": "^7.9.5",
  "axios": "^1.13.2",
  "@mui/material": "^7.3.5",
  "@mui/icons-material": "^7.3.5",
  "tailwindcss": "^4.1.17"
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Tushar Sahu**
- GitHub: [@Tushar-Sahu7](https://github.com/Tushar-Sahu7)
- Repository: [Log2c-Table](https://github.com/Tushar-Sahu7/Log2c-Table)

## 🙏 Acknowledgments

- React.js Documentation
- Material-UI Team
- MongoDB Atlas
- Express.js Community
- Tailwind CSS

## 📧 Contact

For any queries or suggestions, please open an issue on GitHub.

---

⭐ If you find this project helpful, please give it a star!
