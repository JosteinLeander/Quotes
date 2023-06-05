const mongoose = require("mongoose");

// Definere wishlist skjema
const QuotesSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    number: { 
        type: Number, 
        require: true
    },
    wishitem: {
        type: String,
        require: true
    },
    dato: {
        type: Date,
        require: true,
        unique: true,
        lowercase: true
    }
});

const Quotes = mongoose.model("quote", QuotesSchema);

module.exports = Quotes;