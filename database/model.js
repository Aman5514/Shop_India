const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");


// User registration schema------------------------------>

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:3,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value))
        {
            throw new Error("Email is not valid")
        }
    }
  },
  password: {
    type: String,
    required: true,
    trim:true,
    minLength:4
  },
  cpassword: {
    type: String,
    required: true,
    trim:true,
    minLength:4
  },
  tokens:[{
    token:{
      type:String,
      required: true
    }
  }]
  
});

registerSchema.methods.generateAuthToken = async function()
{
  try {
    const token = jwt.sign({_id:this._id.toString()},"mynameisamangutaandiwanttobecomesuccessfulldeveloper");
    this.tokens = this.tokens.concat({token:token})
    return token;
  } catch (error) {
    res.status(400).send(error.message)
  } 
}
// hashing password using bcrypt------------------------------>

registerSchema.pre("save", async function(next)
{
     this.password = await bcrypt.hash(this.password,10);
     this.cpassword = this.password;
  next();
}) 
const Registration = new mongoose.model("Registration",registerSchema);

// generating tokens------------------------------------------>









// Display itemSchema---------------->

const ItemSchema = new mongoose.Schema({
  title: {
      type: String,
      trim: true,
      required: true
  },
  price: {
      type: Number,
      trim: true,
      required: true
  },
  offprice:{
      type: Number,
      trim: true,
      required: true
  },
  desc: {
      type: String,
      trim: true,
      required: true
  },
  image:{
   data: Buffer,
   contentType:String
  }
  })
  

const DisplayItem = new mongoose.model("displayItem",ItemSchema);




module.exports = {Registration,DisplayItem}
