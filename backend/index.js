import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/users', userRoutes);

// Port
const port = process.env.PORT; // Default to 5000 if process.env.PORT is undefined

app.listen(port, () => console.log(`Server running on port ${port}`));