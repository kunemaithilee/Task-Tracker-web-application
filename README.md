# Task Tracker

A full-stack MERN Task Tracker web application with a modern SaaS-style dashboard.

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React Icons, React Toastify
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, express-validator

## Features

- Create, read, update, and delete tasks
- Search tasks by title and description
- Filter by status and priority
- Sort by newest, oldest, due date, and priority
- Statistics dashboard (total, pending, in progress, completed)
- Responsive design (desktop, tablet, mobile)
- Toast notifications
- Loading spinners
- Empty and error states
- Delete confirmation dialog

## Project Structure

```
TaskTracker/
├── client/              # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context for state management
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── utils/       # Constants and utilities
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/              # Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Error handling middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── utils/           # Utility classes
│   ├── server.js        # Entry point
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Installation

1. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

### Running Locally

1. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend (in a separate terminal):
   ```bash
   cd client
   npm run dev
   ```

3. Open http://localhost:5173 in your browser.

## API Endpoints

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/tasks       | Get all tasks      |
| POST   | /api/tasks       | Create a new task  |
| GET    | /api/tasks/:id   | Get a single task  |
| PUT    | /api/tasks/:id   | Update a task      |
| DELETE | /api/tasks/:id   | Delete a task      |

### Query Parameters (GET /api/tasks)

- `search` - Search by title or description
- `status` - Filter by status (Pending, In Progress, Completed)
- `priority` - Filter by priority (Low, Medium, High)
- `sort` - Sort order (newest, oldest, dueDate, priority)

## Deployment

### Backend (Render)

1. Push the repository to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables (MONGO_URI, CLIENT_URL, etc.)

### Frontend (Vercel)

1. Push the repository to GitHub
2. Import the project in Vercel
3. Set:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g., `https://your-app.onrender.com/api`)
5. Deploy

## License

MIT
