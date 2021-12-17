const express = require('express');
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

const app = express();

connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/todos', require('./routes/api/todos'));

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));