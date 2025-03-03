import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    } ,
    description : {
        type : String,
        required : true
    }, 
    image : {
        type : String,
        required : true
    }, 
    status : {
        type : String,
        enum :  ['ACTIVE','INACTIVE'],
        required : true
    }, 

},{timestamps : true})

export const Category = mongoose.model('Category', categorySchema)