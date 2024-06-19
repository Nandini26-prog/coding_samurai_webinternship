const path=require("path");
const express = require('express');
const mongoose=require('mongoose');

const userRoute=require('./routes/user');

const app=express();
const PORT = 8000; //to not fix a port we will use env

mongoose.connect('mongodb+srv://admin:admin1@cluster0.pvuj1xh.mongodb.net/Blog2').then(e=> console.log('MongoDB connected'));

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    res.render("home");
});

app.use("/user",userRoute);
app.listen(PORT,()=> console.log("server started at port: ${PORT}"));
