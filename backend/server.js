// backend/server.js
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors())

// Serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.post('/update-tap-points', async (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
