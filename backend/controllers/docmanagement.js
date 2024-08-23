const _DocumentMetadata = require("../models/Documentdata.js");
const fs=require('fs');//built-in module to interact with files
const path=require('path');
// const { findByIdAndUpdate } = require("../models/Useragain.js");
const uploaduserdocuments= async (req, res) => {
    try {
      
      const file = req.file;
      console.log(file);
     const {description}=req.body;
     const afile=req.file;
     const type=afile.mimetype;
     const size=afile.size;
    const fileurl=afile.path;
    console.log("fileurl",fileurl);
      
  
      const newUserDocumentsData = new _DocumentMetadata({
        description:description,
        type:type,
        size:size,
    fileurl:fileurl
      });
  
      await newUserDocumentsData.save()
      .then((data)=>{
        console.log(data);
        res.status(200).send(data);
      })
     
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };


//Delete user documents

  const deleteUserDocuments=async(req,res)=>{
try{
const {id}=req.query;
// console.log(req);
console.log('id', id);
const file=await _DocumentMetadata.findById({_id:id});
console.log(file);
const fileurl=file.fileurl;
console.log(fileurl);
if(!file){
    console.log(file);
    console.log("file not deleted");
}
filePath=path.join(__dirname,"./",fileurl);
console.log(filePath);
// console.log(__dirname);
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist:', err);
    } else {
        console.log('File exists, ready to delete');
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
    }
});                                                      
await _DocumentMetadata.findByIdAndDelete(id)
.then(()=>{res.status(200).send('File successfully removed')})
.catch(err=>res.status(500).send('Database error:',err))
}catch(error){
    console.log(error);
    res.status(500).send(error.message);
}
  }
  
  //Updating user documents data
  
  
  const upDateUserDocumentsByUserId=async(req,res)=>{
    

      const _id=req.body.id;
      const newFile=req?.file;
      const {description}=req.body;
   
   
   try{

  await _DocumentMetadata.findOne(
    {_id})
  .then((response)=>{
    const{fileurl}=response;
    console.log(fileurl);

    filePath=path.join(__dirname,"./",fileurl);
    console.log(filePath);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', err);
        } else {
            console.log('File exists, ready to delete');
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }
    }); 
  }
  )
await _DocumentMetadata.findByIdAndUpdate({_id},
  {
    
    type:newFile.mimetype,
    size:newFile.size,
    fileurl:newFile.path,
    description:description
  }
  ,{new:true}
)
.then((data)=>{
  const newFilePath=path.join(__dirname,'./',newFile.path);
  console.log(newFilePath);
//   fs.rename(newFilePath, filePath, (renameErr) => {
//     if (renameErr) {
//         console.error('Error renaming new file:', renameErr);
//         return res.status(500).json({ message: 'Error saving new file' });
//     } else {
//         console.log('New file saved successfully at the old location');
//     }
// // });
  res.status(200).send(data)})
.catch((err)=>{res.status(500).send(err)})

   }
catch(error){
      console.log(error); 
      res.status(500).send(error);
     }
   }







  const DocumentGet=async(req,res)=>{
    const _id=req.body.id;
    try{
await _DocumentMetadata.findOne(_id)
.then((response)=>{
  console.log(response);
  res.status(200).send(response)
})
// console.log(DocumentData);
// console.log(DocumentData);
// res.status(200).send(DocumentData);
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
  }

  module.exports={uploaduserdocuments,deleteUserDocuments,upDateUserDocumentsByUserId,DocumentGet};