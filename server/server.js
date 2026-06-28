const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Task Tracker API is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
