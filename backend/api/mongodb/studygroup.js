//Created by Nafiz Mazumder - B00811858
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    createdBy: {
        type: Object
    },
    name: {
        type: String,
    },
    size: {
        type: Number,
    },
    visibility: {
        type: String,
    },
    members : { 
        type : Array , 
        "default" : [] 
    },
    description : {
        type: String,
    },
},
{
    versionKey: false
});

const studyGroup = mongoose.model("studygroup", groupSchema);
module.exports = studyGroup;