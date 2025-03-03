import mongoose, { Schema } from "mongoose";

const contactInfoSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  });
const vendorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    description : {
        type : String,
        required : true
    },
    logo : {
        type : String,
        required : true
    },
    contact_info : {
        type: contactInfoSchema,
        required: true 
    },
    status:{
        type : String,
        enum : ['PENDING','APPROVED','SUSPENDED','HOLD'],
        required : true
    },
    rating : {
        type : Number,
        default : 0.0
    }
},{timestamps : true})

export const Vendor = mongoose.model('Vendor', vendorSchema)