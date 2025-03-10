import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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
userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName
    },process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
})
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id,
       
    },process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
})
}
export const User = mongoose.model('User', userSchema)