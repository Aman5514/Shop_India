require('dotenv').config();

const mongoose = require("mongoose")

// connecting to the mongoDB data base
function connection(){
        mongoose.connect("mongodb+srv://amang5514:ShopIndiaByAman@userregistration.cvvlz.mongodb.net/E_commerce_database?retryWrites=true&w=majority",{
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
