const mongoose = require("mongoose")

const SavedDateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    note: {
        type: String,
        default: "",
        maxlength: 500
    },

    weather: {
        temp: Number,
        humidity: Number,
        rainChance: Number,
        windSpeed: Number,
        condition: String
    }
}, { timestamps: true })

SavedDateSchema.index({ user: 1, date: 1 }, { unique: true })

const SavedDateModel = mongoose.model("SavedDate", SavedDateSchema)
module.exports = SavedDateModel