const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");







exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{

    const {JWTtoken} = req.cookies;

    console.log('cookie from req', JWTtoken);

    if(!JWTtoken){
        return next (new ErrorHandler('Unauthorised Reqest, Please Login', 400))
    }

    const decodedData = jwt.verify(JWTtoken, process.env.JWT_KEY)

    console.log('decoaded Data', decodedData);

    req.admin = await Admin.findById(decodedData.id)

    next()

})

//To check Role
exports.authorizeRole = (...roles)=>{


    return (req, res, next)=>{
        console.log(roles);
        console.log(req.admin.role);
        if(!roles.includes(req.admin.role)){

            console.log('role  not match');
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access the resource`, 400))

        }
        next()
    }
}