const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler');
const sendJWT = require('../utils/jwt')

//Admin Schema
const Admin = require('../models/adminModel');


//Admin Registration
exports.adminRegister = catchAsyncError(async (req, res, next)=>{


    const { adminId, password } = req.body;

    const admin = await Admin.findOne({adminId : adminId})

    if(admin){
        return next(new ErrorHandler("Email Id ALready Registered", 400))
    }

    const newAdmin = await Admin.create({
        adminId,
        password
    })

    sendJWT(newAdmin, 201, res)
})


//Admin Login
exports.adminLogin = catchAsyncError(async (req, res, next)=>{

    const {adminId, password} = req.body;

    console.log('Login runs');
    console.log(adminId);

    // //Check if value entered
    if(!adminId || !password){
        return next(new ErrorHandler("please Enter login Id Password", 400))
    }

    //Search for admin in data Base
    const admin = await Admin.findOne({adminId : adminId}).select("+password")

    console.log("--------------------------------");
    console.log(admin);
    console.log("--------------------------------");


    if(!admin){
        return next(new ErrorHandler("Admin Not Found"), 400)
    }

    const isPassMatched = await admin.comparePassword(password)

    if(!isPassMatched){
        return next(new ErrorHandler('Invalid passord or email', 400))
    }

    //if Password is matched
    //reset password methode should be made null
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save()

    sendJWT(res, admin)

})

//Logout 
exports.adminLogout =  async (req, res, next)=>{

    res.clearCookie('JWTtoken')

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    })

};

//Get User Details
exports.getAdminDetails = catchAsyncError ( async (req, res, next)=>{

    const admin = await Admin.findById(req.admin.id);

    if(!admin){
        return next(new ErrorHandler("Admin Not Found", 404))
    }

    res.status(200).json({
        success : true,
        admin
    })

})