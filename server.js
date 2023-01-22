const app = require("./app")
const dotenv = require("dotenv")
const cloudinary = require("cloudinary")

//DataBase Connection import
const connectDatabase = require('./config/database')

//Connection to ENV Config
dotenv.config({path:"./config/config.env"})

//Calling Database connection function
connectDatabase();






//Connect server to port
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running at http:/${process.env.HOST}:${process.env.PORT}`)

})

