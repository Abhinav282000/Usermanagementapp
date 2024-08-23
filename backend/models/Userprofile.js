const mongoose=require("mongoose");
const Needer=require("../models/Useragain");
const Userprofileschema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    age:
    {
        type:Number,
        required:true,
    },
    fileurl:
    {
        type:String,
        required:true
    }
    
})
const Userprofiledata=mongoose.model("Userprofileinfo",Userprofileschema);
module.exports=Userprofiledata;