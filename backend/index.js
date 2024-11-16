import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import cors from 'cors';
dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from the frontend (localhost:3000)
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
  credentials: true  // Allow credentials like cookies or authorization headers
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

// Port
const port = process.env.PORT; // Default to 5000 if process.env.PORT is undefined

app.listen(port, () => console.log(`Server running on port ${port}`));
