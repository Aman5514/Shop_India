const express = require("express");
const { Registration , DisplayItem } = require("../database/model");
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRouter");
const private = require("../middleware/privateRoutes")
const UploadedData = DisplayItem.find({});


// database
require("../database/database");

// static files and using packages

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }));
app.use(cookieParser());
// routers ---------------->
app.use("/admin",adminRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

// view engine --------------->
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("home/login");
});

app.get("/login", (req, res) => {
  res.render("home/login");
});

app.get("/home",private, (req, res) => {
    UploadedData.exec((error,data)=>
{
  if (error)
  {
    throw new Error("Data not Found Internal Server Error");
  }
  res.render("home/index",{
    product:data
  });
});


});

app.get("/cart",private,(req, res) => {
  res.render("home/cart");
});

// for signup ---------------->

app.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const ConfirmPassword = req.body.cpassword;

    if (password === ConfirmPassword) {
      const user = new Registration({
        name: req.body.name,
        email: req.body.email,
        password: password,
        cpassword: ConfirmPassword,
      });
     const token =  await user.generateAuthToken();
     await user.save();
      res.cookie("ShopIndiaCookie",token,{
        expires: new Date(Date.now() + 3000000*24),
        httpOnly:true
      });
      res.status(200).render("success/succes");
    } else {
      res.status(404).render("error/notsame");
    }
  } catch (error) {
    res.status(404).render("error/exist");
  }
});

// for login

app.post("/login",async (req, res) => {
  try {
    const loginEmail = req.body.login_email;
    const loginPassword = req.body.login_password;
    const userData = await Registration.findOne({ email: loginEmail });
    const {password} = userData;
    const matchPassword = await bcrypt.compare(
      loginPassword,
      userData.password
    );
    const token = await userData.generateAuthToken();
    res.cookie("ShopIndiaCookie",token,{
      expires: new Date(Date.now() + 3000000*24),
      httpOnly:true,
    });
    if (
      password === loginPassword ||
      (matchPassword && userData.email === loginEmail)
    ) { 
      res.redirect("/home")
    } else {
      res.status(404).render("error/incorrect");
    }
  } catch (error) {
    res.status(404).render("error/incorrect");
  }
});


app.get("*", (req, res) => {
  res.redirect("/")
});
