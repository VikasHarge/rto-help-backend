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
router.route("/allComplains").get(  getAllComplains)

//get complain details
router.route("/:complainId").get( getSingleComplain)

//Delete Complain details
router.route("/:complainId").delete( deleteComplain)

//Update Complain(add remark) - admin
router.route('/addRemark').post( updateComplain)

//Update Complain(Status) - admin
router.route('/changeStatus').post( changeComplainStatus)


module.exports = router