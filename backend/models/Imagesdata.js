// const mongoose=require("mongoose");
// const ImagesSchema= new mongoose.Schema({
//     filename:{
//         type:String,
//         required:true,
//     },
//     imageurl:{
//         type:String,
//         required:true,
//     },
//     description:
//     {
//         required:true,
//         type:String,
//     },
//     uploadedby:
//     {
//         type:Schema.Typed.ObjectID,ref:"Needer_user"
//     },
//     createdAt:{
//         type:Date,default:null
//     },
//     timestamp:
//     {
//         required:true,
//     }
// })
// const Imagesdata=mongoose.model("_Imagesdata",ImagesSchema);
// module.exports=Imagesdata;