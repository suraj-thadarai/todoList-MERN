const dotenv = require('dotenv').config()
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./connect/database')
const port = process.env.PORT || 5000;

connectDB();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on ${port}`))