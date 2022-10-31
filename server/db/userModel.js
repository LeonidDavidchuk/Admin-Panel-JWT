const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, "Please provide a Login!"],
        unique: [true, " Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,  
    },
});

module.exports = mongoose.model.User || mongoose.model("User", UserSchema);