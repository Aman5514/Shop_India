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
    res.redirect("/")
  }
};

module.exports = private;
