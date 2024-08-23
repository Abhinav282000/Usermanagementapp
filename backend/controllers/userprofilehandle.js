const Userprofiledata = require("../models/Userprofile");
const fs=require('fs');//built-in module to interact with files
const path=require('path');

const uploaduserProfile=async (req, res) => {
      try {
        const { name, age } = req.body;
        const file = req.file;
        const fileurl=file.path;
    console.log(fileurl);
        if (!file || !name || !age) {
          return res.status(400).json({ message: 'Missing file or text fields' });
        }
    
        const newUserProfile = new Userprofiledata({
          name:name,
          age:age,
          fileurl:fileurl,
        });
    
        await newUserProfile.save();
        console.log(newUserProfile);
        res.status(200).json({ success: 'User profile data saved successfully', file });
      } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'An error occurred' });
      }
    }
    const getUserProfile=async(req,res)=>{
      const _id=req.body.id;
      try{
await Userprofiledata.findOne(_id)
.then((response)=>{
  console.log(response);
  res.status(200).send(response); 
})

      }catch(error){
        console.log(error);
        res.status(500).send(error)
      }
    }

    const deleteUserProfile=async(req,res)=>{
      try{
      const {id}=req.query;
      // console.log(req);
      console.log('id', id);
      const file=await Userprofiledata.findById({_id:id});
      console.log(file);
      const fileurl=file.fileurl;
      console.log(fileurl);
      if(!file){
          console.log(file);
          console.log("file not deleted");
      }
      filePath=path.join(__dirname,"./",fileurl);
      console.log(__dirname);
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
      await Userprofiledata.findByIdAndDelete(id)
      .then(()=>{res.status(200).send('File successfully removed')})
      .catch(err=>res.status(500).send('Database error:',err))
      }catch(error){
          console.log(error);
          res.status(500).send(error.message);
      }
        }
        const upDateUserProfileByUserId=async(req,res)=>{
    

          const _id=req.body.id;
          const newFile=req?.file;
          const {name,age}=req.body;
          const fileurl=newFile.url;
       
       
       try{
    
      await Userprofiledata.findOne(
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
    await Userprofiledata.findByIdAndUpdate({_id},
      {
        
        fileurl:newFile.filurl,
        name:name,
        age:age,
        
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
    
    module.exports={uploaduserProfile,deleteUserProfile,getUserProfile,upDateUserProfileByUserId};