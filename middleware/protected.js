const jwt = require("jsonwebtoken");
const {Registration} = require("../database/model");

const protected = async (req, res, next) => {
  try {
    const token = req.cookies.ShopIndiaCookie;
    const verify = jwt.verify(token,"mynameisamangutaandiwanttobecomesuccessfulldeveloper");
    const user = await Registration.findOne({_id:verify._id});

    if(verify && user.email === "amang5514@gmail.com")
    {
        next();
    }
    else {
       if(verify)
       {
           res.redirect('/home')
       }
    }

  } catch (error) {
    res.redirect('/')
  }
};

module.exports = protected;
