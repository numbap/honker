import mongoose from 'mongoose'
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const UserSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true,'Please provide a name'], 
        minlength:3, 
        maxlength:20, 
        trim:true},
    email:{
        type:String, 
        required:[true,'Please provide an email'], 
        validate:{
            validator: validator.isEmail,
            message: 'please provide an email'
        },
        unique:true},   
    password:{
        type:String, 
        select: false,
        required:[true,'Please provide a password'], 
        minlength:6}, 
    lastName:{
        type:String, 
        default: 'Smith',
        maxlength:20, 
        trim:true},
    location:{
        type:String, 
        default: 'Remote',
        maxlength:20, 
        trim:true},
})

UserSchema.pre('save', async function(){
    if(this.isModified('password')){
        const salt = await bcryptjs.genSalt(10)
        this.password =  await bcryptjs.hash(this.password, salt)
    }
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}) 
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs.compare(candidatePassword, this.password)
    return isMatch
  }

export default mongoose.model('User', UserSchema)