const mongoose = require('mongoose');

// Define your schema
const caretipsSchema = new mongoose.Schema({
    ID: Number,
    Type: String,
    Title: String,
    Description: String,
    Location: String,
}, { collection: 'caretips' });

const Caretips = mongoose.model('Caretips', caretipsSchema);

module.exports = Caretips;
