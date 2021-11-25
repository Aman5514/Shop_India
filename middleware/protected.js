require('dotenv').config();
const jwt = require("jsonwebtoken");
const { Registration } = require("../database/model");

const protected = async (req, res, next) => {
  try {
    const token = req.cookies.ShopIndiaCookie;
    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    const user = await Registration.findOne({ _id: verify._id });

    if (verify && user._id === "619f461f4049bc28a425bb9f") {
      next();
    } else {
      if (verify) {
        res.redirect("/home");
      }
    }
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = protected;
