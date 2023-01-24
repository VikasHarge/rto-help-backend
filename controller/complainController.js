const ErrorHandler = require("../utils/errorhandler")
//Import Schema
const catchAsyncError = require('../middleware/catchAsyncError')
const Complain = require('../models/complainModel')




//Register New Complain
exports.newComplain =  catchAsyncError(async (req, res, next)=>{

    //Create new Complain
    const { name, phone, vehicleNumber, description, location, mainVideoUrl, frontVideoUrl  } = req.body;
    

    console.log("runs");
    const complain = await Complain.create({
        name,
        phone,
        vehicleNumber,
        description,
        location,
        frontVideoUrl,
        mainVideoUrl
    })

    res.status(200).json({
        success : true,
        message : "Complain Submitted Successfully",
        complain : complain
    })
})


//Admin 
//Get All Complains - admin
exports.getAllComplains = catchAsyncError( async (req, res, next)=>{


    // all complains
    const complains = await Complain.find({});
    const complainCount = await Complain.countDocuments();

    if(!complains){
       return next(new ErrorHandler("No Complain Registred Yet", 404))
    }

    res.setHeader('Content-type', 'application/json');
    res.status(200).json({
        success : true,
        complains,
        complainCount
    })

})

//Get Complain by ID
exports.getSingleComplain = catchAsyncError( async (req, res, next)=>{
    const singleComplain = await Complain.findById(req.params.complainId)

    if(!singleComplain){
        return next(new ErrorHandler("Complain not found", 404));
    }

    res.setHeader("Content-type", "application/json");
    res.status(200).json({
        success : true,
        singleComplain
    })
})

//Delete Complain
exports.deleteComplain =  catchAsyncError( async (req, res, next)=>{

    const complain = await Complain.findById(req.params.complainId);

    if(!complain){
        return next( new ErrorHandler("Complain not found", 400) )
    }

    await complain.remove();

    res.status(200).json({
        success : true,
        message : "Complain deleted successfully",
        complain
    })

} )


//Update Complain (Change Remark) - admin
exports.updateComplain = catchAsyncError(async (req, res, next)=>{

    let complain = Complain.findById(req.body.complainId)


    if(!complain){
        return next(new ErrorHandler("Complain not found", 404))
    }

    complain = await Complain.findByIdAndUpdate(req.body.complainId, {remark : req.body.remarkValue}, {new : true})

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        success : true,
        message : "Remark Added Successfully",
        complain
    })

})


//Update Complain (Change Status) - admin
exports.changeComplainStatus =  async(req, res, next)=>{

    let complain = await Complain.findById(req.body.complainId);

    if(!complain){
        console.log("returned");
        return next(new ErrorHandler("Complain not found", 404));
    }

    complain = await Complain.findByIdAndUpdate(req.body.complainId, {status : req.body.statusValue}, { new : true})

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
        success : true,
        message : "Status Changed Successfully",
        complain
    })
}
