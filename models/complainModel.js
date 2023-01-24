const mongoose = require('mongoose');
const validator = require('validator')

const complainSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true, "Please Provide Name"],
    },
    phone : {
        type : String,
        require : [true, "Please enter phone number"],
        minLength : [10, "Phone number should be of 10 digits"],
        validate : [validator.isMobilePhone, "please enter valid mobile number"],
    },
    vehicleNumber : {
        type : String,
        require : [true, "vehicle number is required"],
        minLength : [5, "too small, not a valid number"],
    },
    description : {
        type : String,
        required : [true, "please Enter Complain Description"],
    },
    location : {
        latitude : {
            type : Number,
        },
        longitude : {
            type : Number
        }
    },
    status : {
        type : String,
        default : 'new'
    },
    remark : {
        type : String,
        default : null,
    },
    date : {
        type : Date,
        default : Date.now(),
    },
    frontVideoUrl : {
        type : String,
        require : [true, "invalid Url"]
    },
    mainVideoUrl : {
        type : String,
        require : [true, "invalid Url"]
    }
})

complainSchema.pre('save', function(next){
    this.date = Date.now()
    next();
})


module.exports = mongoose.model("rto-complains", complainSchema)