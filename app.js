const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const errorMiddleware = require("./middleware/error")
const cookieParser = require('cookie-parser')

//Express Module
const app = express();
app.use(express.json())

//Cors Added
app.use(cors({origin: true, credentials: true}))

//Body-Parser
app.use(bodyParser.urlencoded({extended : true}));

//Cookie-parser
app.use(cookieParser())

//Import Router
const complainRouter = require("./routes/complainRoute")
const adminRoute = require("./routes/adminRoute")


//Redirect to function
app.use('/complains', complainRouter)
app.use('/admin', adminRoute)

//Middleware to handle Error
app.use(errorMiddleware)






module.exports = app;


