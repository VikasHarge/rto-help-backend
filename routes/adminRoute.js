const express = require('express');
const { adminLogin, adminRegister, adminLogout, getAdminDetails } = require('../controller/adminControl');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');



const router = express.Router();

//Route to register
router.route('/register').post(adminRegister)

//Route to login
router.route('/login').post(adminLogin)

//Route to logout
router.route('/logout').post(adminLogout)

//Get Admin Details
router.route('/me').get( isAuthenticatedUser, authorizeRole('admin'), getAdminDetails)






module.exports = router