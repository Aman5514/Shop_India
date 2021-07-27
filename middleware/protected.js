require('dotenv').config();
const jwt = require("jsonwebtoken");
const {Registration} = require("../database/model");

const protected = async (req, res, next) => {
  try {
    const token = req.cookies.ShopIndiaCookie;
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Registration.findOne({_id:verify._id});
    if(verify && user.email === process.env.ADMIN)
    {
        next();
    }
    else {

           res.redirect('/home')
    }

  } catch (error) {
    res.redirect('/')
  }
};

module.exports = protected;
