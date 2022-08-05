//Created by Nafiz Mazumder - B00811858
//Updated by Raham Moghaddam - modifications made to add security code
//Updated by Noah Cormier-Ratajczak - changes made to reflect all input fields in the registration form
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },

    securityCode: {
        type: String,
    },
    sessionCode: {
        type: String,
    },


},
{
    versionKey: false
});

const User = mongoose.model("user", userSchema);
module.exports = User;