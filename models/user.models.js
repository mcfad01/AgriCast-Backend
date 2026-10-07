const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 10, select: false },
    farmLocation: {
        city: { type: String, default: "" },
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null }
    }


}, { timestamps: true });


const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel 