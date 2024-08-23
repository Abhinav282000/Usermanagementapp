const multer=require('multer');
const path=require('path');
const fs=require('fs');

const profilePicStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './fileUploads/');
      },
      filename: function (req, file, cb) {
        const uniquePrefix = Date.now().toLocaleString();
        cb(null, uniquePrefix + '-' + file.originalname);
      }
    });
    
        
    // const uploadProfilePic = multer({ storage: profilePicStorage });
    const DocumentStorage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './documentsUploads/');
        },
        filename: function (req, file, cb) {
          const uniquePrefix = Date.now();
          cb(null, uniquePrefix + '-' + file.originalname);
        }
      });

      const uploadProfilePic=multer({storage:profilePicStorage})
      const uploadDocumentData=multer({storage:DocumentStorage})
      
      module.exports={uploadProfilePic,uploadDocumentData};