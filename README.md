# Smart Education Platform

A modern, full-stack education platform with AI-powered chatbot support for students.

## 🎯 Features

### Module 1: User Management & Authentication

- **Role-based access**: Admin, Teacher, Student
- **JWT Authentication**: Secure login/logout
- **Admin Dashboard**: Create and manage users
- **Protected Routes**: Role-specific access control

### Module 2: AI Chatbot & Academic Support

- **Student-only access**: Dedicated AI study assistant
- **WhatsApp-style UI**: Modern chat interface
- **Chat History**: Persistent message storage
- **AI Integration**: OpenAI API with mock fallback

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, React Router v6
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: OpenAI API (with mock fallback)

## 📁 Project Structure

```
finalpro/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Login/logout logic
│   │   ├── chatController.js     # AI chatbot logic
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   └── auth.js               # JWT & role verification
│   ├── models/
│   │   ├── Chat.js               # Chat schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── chat.js               # Chat routes
│   │   └── users.js              # User routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── seed.js                   # Database seeder
│   └── server.js                 # Express server
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Layout/
    │   │   │   ├── DashboardLayout.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── ChatMessage.jsx
    │   │   ├── LoadingDots.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── Chatbot.jsx
    │   │   ├── Login.jsx
    │   │   ├── ManageUsers.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   └── TeacherDashboard.jsx
    │   ├── services/
    │   │   └── api.js            # Axios API client
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Step 1: Clone & Navigate

```bash
cd finalpro
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/smart_education
# - JWT_SECRET=your_super_secret_jwt_key_change_in_production
# - OPENAI_API_KEY=your_openai_api_key_here (optional)

# Seed the database with demo users
npm run seed

# Start the backend server
npm run dev
```

### Step 3: Setup Frontend

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

### Step 4: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 🔐 Demo Credentials

| Role    | Email                 | Password   |
| ------- | --------------------- | ---------- |
| Admin   | admin@education.com   | admin123   |
| Teacher | teacher@education.com | teacher123 |
| Student | student@education.com | student123 |

## 📱 Dashboard Features

### Admin Dashboard

- View platform statistics (total users, students, teachers)
- Access user management page
- Create new users (Admin, Teacher, Student)
- Delete existing users
- Search and filter users by role

### Teacher Dashboard

- Overview of teaching activities
- Display of scheduled classes
- Recent activity feed
- Course statistics

### Student Dashboard

- Course progress overview
- Quick access to AI Chatbot
- Learning tips and suggestions
- Assignment tracking

### AI Chatbot (Student Only)

- Modern WhatsApp-style chat interface
- Ask academic questions
- Persistent chat history
- Clear chat functionality
- Suggested questions for new users

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users (Admin only)

- `GET /api/users` - Get all users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/role/:role` - Get users by role
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user

### Chat (Student only)

- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

## 🎨 UI/UX Features

- Clean, modern design with Tailwind CSS
- Responsive layout (mobile + desktop)
- Role-specific color schemes:
  - Admin: Purple theme
  - Teacher: Green theme
  - Student: Blue theme
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications

## ⚙️ Configuration

### Backend Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart_education
JWT_SECRET=your_super_secret_jwt_key_change_in_production
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: If `OPENAI_API_KEY` is not provided or is set to the placeholder value, the chatbot will use intelligent mock responses.

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based route protection
- Input validation
- CORS enabled
- Protected API endpoints

## 📝 Notes

- This is Phase 1 (50% completion) of the Smart Education Platform
- AI Chatbot works with or without OpenAI API key (mock fallback available)
- All data is stored in MongoDB
- The platform is fully functional and production-ready

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Make sure MongoDB is running
mongod --dbpath /path/to/your/data
```

### Port Already in Use

```bash
# Change PORT in backend/.env
# Or kill the process using the port
npx kill-port 5000
npx kill-port 3000
```

### Missing Dependencies

```bash
# Re-install dependencies
rm -rf node_modules
npm install
```

## 📄 License

MIT License - Feel free to use this project for educational purposes.
