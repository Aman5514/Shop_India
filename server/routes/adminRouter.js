const express = require("express");
const router = express.Router();
const store = require("../../middleware/multer");
const { DisplayItem } = require("../../database/model");
const fs = require("fs");
const protected = require("../../middleware/protected")
router.use(express.static("public"));
router.use(
  express.urlencoded({
    extended: false,
  })
);
// admin home page

router.get("/",protected, (req, res,next) => {
  res.render("adminPanel/admin");
});

// admin upload page

router.get("/upload",protected,(req, res,next) => {
  res.render("adminPanel/upload");
});


router.post("/upload-data",store.single("image"), async (req,res,next) => {

  const files = req.file;
  if(!files)
  {
    const error = new Error("please upload file");
    return next(error);
  }

  // convert images into base64 encoding

  const img = fs.readFileSync(files.path)
  const encoding_img_data = img.toString('base64');

    try {
      const items = new DisplayItem({
        title:req.body.title,
        price:req.body.price,
        offprice:req.body.offprice,
        desc:req.body.desc,
      });
      items.image.data = Buffer.from(encoding_img_data,"base64");
      items.image.contentType = files.mimetype;
      await items.save();
      res.status(200).render("adminPanel/upload")
    } catch(error){
      res.status(404).send("Unable to upload data")
    }
});

module.exports = router;
