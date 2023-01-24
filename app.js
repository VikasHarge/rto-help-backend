const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const errorMiddleware = require("./middleware/error")
const cookieParser = require('cookie-parser')

//Express Module
const app = express();
//Body-Parser
app.use(bodyParser.urlencoded({limit : 500000000 , extended : true, parameterLimit:500000}));
app.use(bodyParser.json({limit : 500000000}))

app.use(express.json())

//Cookie-parser
app.use(cookieParser())

//Cors Added
app.use(cors({origin: true, credentials: true}))




//Import Router
const complainRouter = require("./routes/complainRoute")
const adminRoute = require("./routes/adminRoute");
const sendJWT = require('./utils/jwt');


//Redirect to function
app.use('/complains', complainRouter)
app.use('/admin', adminRoute)


// app.get('/coo', (req, res, next)=>{



//     try {

//         sendJWT( res )

//         const options = {
//             expires : new Date(
//                 Date.now()+process.env.COOKIES_EXPIRE* 24 * 60 * 60 * 1000
//             ),
//             httpOnly : true,
//             withCredentials : true,
//             sercue : true,
//         }
//         res.cookie('1', 'data')
//         res.status(200).json({
//             success : true,
//             message : "Logged in succesfully",
//         })
        
//     } catch (error) {
//         res.send(error)
        
//     }
 
// })

//Middleware to handle Error
app.use(errorMiddleware)






module.exports = app;


