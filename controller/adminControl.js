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

    const {loginId, loginPassword} = req.body;

    // //Check if value entered
    if(!loginId || !loginPassword){
        return next(new ErrorHandler("please Enter loginId Password", 400))
    }

    //Search for admin in data Base
    const admin = await Admin.findOne({adminId : loginId}).select("password")

    console.log(admin);

    if(!admin){
        return next(new ErrorHandler("Admin Not Found"), 400)
    }

    const isPassMatched = await admin.comparePassword(loginPassword)

    if(!isPassMatched){
        return next(new ErrorHandler('Invalid passord or email', 400))
    }

    //if Password is matched
    //reset password methode should be made null
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save()

    sendJWT(admin, 200, res)

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