import mongoose from 'mongoose'
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    password:{
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        required : true,
    },
    is_active : {
        type : Boolean,
        default  : false
    },
    is_verified : {
        type : Boolean,
        default  : false
    },
    refreshToken : {
        type : String,
    },
    role: { 
        type: String, 
        enum: ["ADMIN", "USER", "VENDOR"], 
        required: true 
      }
},{timestamps : true })

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    return next()

})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model('User', userSchema)