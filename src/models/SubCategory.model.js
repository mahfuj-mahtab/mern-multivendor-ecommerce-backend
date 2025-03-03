import mongoose, { Schema } from "mongoose";

const Sub_CategorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    } ,
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
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

export const Sub_Category = mongoose.model('Sub_Category', Sub_CategorySchema)