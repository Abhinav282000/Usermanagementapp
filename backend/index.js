var express=require('express')
var mongoose=require('mongoose');
var app=express();
const multer = require('multer')
const cors=require("cors");
var port=process.env.PORT||3000;
var User=require('./models/Useragain.js');
var db=require("./mysetup/myurl").myurl;
var bodyparser=require("body-parser");
const authenticate_data=require("./controllers/signinapi.js");
const signupController=require("./controllers/signupapi.js")
const Userprofiledata = require('./models/Userprofile'); // Adjust the path if necessary
const multerConfig=require("./controllers/multerConfig.js")
// const uploaduserdocuments=require("./controllers/userdocuments")
const UserProfileHandler=require("./controllers/userprofilehandle.js");
const docmanagement=require("./controllers/docmanagement.js");
app.use(bodyparser.urlencoded({extended:false}));//middleware to handle form data
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('documentsUploads'))
app.use(express.static('fileUploads'))

mongoose.connect(db).then(()=>{
    console.log("Database is connected");
})
.catch(err=>{
    console.log("Error is",err.message);
});

app.get('/',(req,res)=>{
    res.status(200).send('Hi welcome to the llogin and signup api');

});
app.post('/store-data',(req,res)=>{
    signupController.store_data(req,res);
});
app.post('/authenticate-data-for-login',(req,res)=>{ authenticate_data(req,res)});

   
    
     app.post('/profile', multerConfig.uploadProfilePic.single('file'),(req, res) => {UserProfileHandler.uploaduserProfile(req,res)});
   app.delete('/deleteProfile',(req,res)=>{UserProfileHandler.deleteUserProfile(req,res)})
    app.put('/updateUserProfile',multerConfig.uploadProfilePic.single('file'),(req,res)=>{UserProfileHandler.upDateUserProfileByUserId(req,res)})
      app.get('/getUserProfiledata',(req,res)=>{UserProfileHandler.getUserProfile(req,res)}) ; 
   
   
   
      app.post('/documents',multerConfig.uploadDocumentData.single('documents'),(req,res)=>{ docmanagement.uploaduserdocuments(req,res)});
    app.delete('/documentsdelete',(req,res)=>{ docmanagement.deleteUserDocuments(req,res)});
    app.put('/documentUpdate',multerConfig.uploadDocumentData.single('documents'),(req,res)=>{
        docmanagement.upDateUserDocumentsByUserId(req,res)
    });
    app.get('/documentGet',(req,res)=>{
        docmanagement.DocumentGet(req,res);
    })


app.listen(port,()=>{
    console.log(port);
    console.log('Server is listening on port',port);
});