const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

const connectDatabase = ()=> {
    mongoose
        .connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data)=>{
            console.log(`Mongodb Connected with ${data.connection.name}`);
        })     
};

module.exports = connectDatabase;