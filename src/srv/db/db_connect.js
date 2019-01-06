const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/form_builder');

const db = mongoose.connection;
db.on('error', () => console.log('Connection error:'));
db.once('open', () => console.log('Connected to database'));
