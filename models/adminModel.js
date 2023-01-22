const mongoose = require('mongoose');
const validator = require('validator')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const adminSchema = new mongoose.Schema({
    adminId : {
        type : String,
        require : true,
        unique : [true, 'Email Already Registred'],
        validate : [validator.isEmail, 'Please Enter Valid Email Id']

    },
    password : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        default : 'user'
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

//Encrypt Password Before Saving
adminSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

//Schema Methodes
//1) Password Comparison methode
adminSchema.methods.comparePassword = async function(incomingPass){
    return await bcrypt.compare(incomingPass, this.password)
}

//2) JWT Generator Methode
adminSchema.methods.getJWT = function(){
    return jwt.sign({id : this._id}, process.env.JWT_KEY, {
        expiresIn : process.env.JWT_EXPIRE
    })
}




module.exports = mongoose.model("admin", adminSchema)