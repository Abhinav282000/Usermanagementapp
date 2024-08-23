const { JsonWebTokenError } = require("jsonwebtoken");
var mongoose=require("mongoose");
var jwt=require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    userRole:{
        type:String,
        enum: ['user', 'admin', 'superadmin'],
        default:'user',
    }
});
UserSchema.methods.generateToken=async function(){
    try{
        return jwt.sign(
            {
                userId:this._id.toString(),
                name:this.name,
                userRole:this.userRole,
                password:this.password,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRET_KEY="gfdljhsak",
            {
                expiresIn:"30d",
            }
        );
    }
    catch(err)
    {
        console.log(err);
    }
}
const Needer=mongoose.model("Needer_user",UserSchema);
module.exports=Needer;