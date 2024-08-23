const mongoose = require("mongoose");

const DocumentdataSchema = new mongoose.Schema({
    
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
         enum: [ '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv',
    '.mp3', '.wav', '.ogg', '.txt', '.png', '.jpeg','image/jpeg'],
        required: true
    },
    fileurl:{
         type:String,
         required:true,
    },
    size: {
        type: String,
        required: true
    },
   
    // updatedAt: {
    //     type: Date,
    //     default: null,
    //     required: true
    // },
    // userinvolved:
    // {
    //     type:Schema.Types.ObjectID,ref:"Needer_user"},
    
});

const _DocumentMetadata = mongoose.model("_documentmetadata", DocumentdataSchema);

module.exports = _DocumentMetadata;

