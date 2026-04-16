const express = require('express');
const authRouter = require('./router/auth.route')
const cookieParser = require('cookie-parser')
const cors = require("cors");



const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


app.use("/api", authRouter);


module.exports = app;