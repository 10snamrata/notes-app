const mongoose=require("mongoose")

//userschema
const userSchema=mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  pass:{type:String,required:true}
},{
    versionKey:false
})

//usermodel
const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}