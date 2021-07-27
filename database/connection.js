require('dotenv').config();

const mongoose = require("mongoose")

// connecting to the mongoDB data base
function connection(){
        mongoose.connect(process.env.CLOUD_DB,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>
    {
        console.log("DataBase---->connected")
    })
    .catch(()=>
    {
        console.log("No-----/----->Connection")
    })
} 
connection();
