const express = require("express")
const router = express.Router();
const { Registration , DisplayItem } = require("../../database/model");
const private = require("../../middleware/privateRoutes")

router.use(express.static("public"));

router.get("/:id",(req, res)=>
{
  const id = req.params.id;
  // const productDetails = DisplayItem.findById({_id:id})
  res.render("home/productDetailPage",{
    id:"hello there"
  })
})

  
  module.exports = router;