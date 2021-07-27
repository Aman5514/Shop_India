const jwt = require("jsonwebtoken");
const {Registration} = require("../database/model");

const private = async (req, res, next) => {
  try {
    const token = req.cookies.ShopIndiaCookie;
    const verify = jwt.verify(token,"mynameisamangutaandiwanttobecomesuccessfulldeveloper");
    if(verify)
    {
      next();
    }
  } catch (error) {
    res.send('<h2 style="display:flex; width:100%;justify-content:center;align-item:center; height:50px; color:skyblue" >Please login first </h2>')
  }
};

module.exports = private;
