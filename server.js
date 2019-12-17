const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");

const User = require('/db');

const PORT = process.env.PORT || 5000;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose.connect("mongodb+srv://gdoming:gdoming@cluster0-prlxs.mongodb.net/test?retryWrites=true&w=majority", mongooseOptions)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app
  .use(express.static(path.join(__dirname, '/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

