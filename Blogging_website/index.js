const path=require("path");
const express = require('express');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');

const Blog=require('./models/blog')

const userRoute=require("./routes/user");
const blogRoute= require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middelwares/authentication");

const app=express();
const PORT = 8000; //to not fix a port we will use env

mongoose.connect('mongodb+srv://admin:admin1@cluster0.pvuj1xh.mongodb.net/Blog2').then(e=> console.log('MongoDB connected'));

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
    user: req.user,
    blogs: allBlogs,
    });
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));
