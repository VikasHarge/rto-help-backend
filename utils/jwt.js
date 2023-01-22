//this function  will send jwt in cookies
const sendJWT = (admin, statusCode, res)=>{
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
    }

    //Sending Cookies
    res.status(statusCode).cookie('JWTtoken', token, options).json({
        success : true,
        admin,
        token,
    })
}

module.exports = sendJWT;