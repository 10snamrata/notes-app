const mongoose=require("mongoose")

//userschema
const noteSchema=mongoose.Schema({
  title:{type:String,required:true},
  body:{type:String,required:true},
  userID:{ type:String},
  author:{type:String}
},{
    versionKey:false
})

//usermodel
const NoteModel=mongoose.model("notes",noteSchema)

module.exports={NoteModel}