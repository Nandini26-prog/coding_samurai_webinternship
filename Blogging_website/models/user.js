const {createHmac ,randomBytes}= require("crypto"); 

const { Schema,model } = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt: {  //this is used for Hashing of password
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL:{
        type:String,
        default:"/default.png",
    },
    role:{
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",
    }
 }, 
    {timestamps: true}
);


userSchema.pre('save',function (next) {
    const user = this;  //here this absically points to the user
    if(!user.isModified("password"))
        return;

    //hashing:built-in package used: Crypto
    const salt= randomBytes(16).toString();
    const hashedPassword= createHmac('sha256',salt)
        .update(user.password)
        .digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
});
const User=model("user",userSchema);
module.exports=User;


