const express = require("express");
const { newComplain, getAllComplains, getSingleComplain, deleteComplain, updateComplain, changeComplainStatus } = require("../controller/complainController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");


//Router modeule
const router = express.Router();

//Complain Route
//new complain register
router.route("/newComplain").post(newComplain);



//Admin
// get all complain details
router.route("/allComplains").get( isAuthenticatedUser, authorizeRole('admin'), getAllComplains)

//get complain details
router.route("/:complainId").get( isAuthenticatedUser, authorizeRole('admin'), getSingleComplain)

//Delete Complain details
router.route("/:complainId").delete( isAuthenticatedUser, authorizeRole('admin'), deleteComplain)

//Update Complain(add remark) - admin
router.route('/addRemark').post( isAuthenticatedUser, authorizeRole('admin'),updateComplain)

//Update Complain(Status) - admin
router.route('/changeStatus').post( isAuthenticatedUser, authorizeRole('admin'), changeComplainStatus)


module.exports = router