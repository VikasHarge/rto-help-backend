const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())


//this function  will send jwt in cookies
const sendJWT = (res, admin)=>{
    //Get Token
    const token = admin.getJWT()
    console.log(token);

    //Option Object for cookies
    const options = {
        expires : new Date(
            Date.now()+process.env.COOKIES_EXPIRE* 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
        withCredentials : true,
        sercue : true,
    }

    //Sending Cookies
    res.cookie('JWTtoken', token, options)
    res.status(201).json({
        success : true,
        message : "Logged in succesfully",
        admin,
        token,
    })
}

module.exports = sendJWT;