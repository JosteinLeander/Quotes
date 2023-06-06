const mongoose = require("mongoose");

// Definere quotes skjema
const QuotesSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    quoteitem: {
        type: String,
        require: true
    },
    quoteorigin: {
        type: String,
        require: true
    }
});

const Quotes = mongoose.model("quote", QuotesSchema);

module.exports = Quotes;