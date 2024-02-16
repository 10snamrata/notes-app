const express=require("express")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()


//Registration
userRouter.post("/register",(req,res)=>{
 const {username,email,pass}=req.body
 try{
  bcrypt.hash(pass,8,async(err,hash)=>{
    if(hash){
        const user=new UserModel({username,email,pass:hash})
        await user.save()
        res.status(200).send({"message":"New user has been registered"})
    }else{
        res.status(400).send({"message":"Not able to creating hash","error":err})
    }
  })
 }catch(err){
    res.status(400).send()
 }
})

//Authetication(login)
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id,author:user.username},"masai",{expiresIn:'1d'})
                res.status(200).send({"message":"Login successful",token})
            }else{
                res.send({"message":"Wrong Credendials"})
            }
        })

    }catch(err){
        res.status(400).send()
    }
})


module.exports={userRouter}