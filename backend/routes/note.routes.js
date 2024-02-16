const express=require("express")
const {NoteModel}=require("../model/note.model")
const{auth}=require("../middleware/auth.middleware")
const noteRouter=express.Router()



//restricted routes

//create notes
noteRouter.post("/create",auth,async(req,res)=>{
  try{
   const note=new NoteModel(req.body)
   await note.save()
   res.status(200).send({"msg":"Notes has been added"})
  }catch(err){
    res.status(400).send({"error":err})
  }
})

//get the notes of logged in user or user can read his/her notes only
noteRouter.get("/read",auth,async(req,res)=>{
 try{
    //we want only loged in user notes not all the notes
    //userID in notes(userID) === userid who is making the request(req.body.userID)
  const notes=await NoteModel.find({userID:req.body.userID})
  res.send({notes})
 }catch(err){
    res.status(400).send({"error":err})
 }
})

//update the notes
noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
  const{noteID}=req.params
  try{
    //userID present in note=== userID in the req.body
    const note=await NoteModel.findOne({_id:noteID})
    if(note.userID===req.body.userID){
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.status(200).send({"message":`The note with ID:${noteID} has been updated`})
    }else{
        res.send({"msg":"You are not authorized"})
    }
   
  }catch(err){
    res.status(400).send({"error":err})
  }
})

noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const{noteID}=req.params
    try{
      //userID present in note=== userID in the req.body
      const note=await NoteModel.findOne({_id:noteID})
      if(note.userID===req.body.userID){
          await NoteModel.findByIdAndDelete({_id:noteID})
          res.status(200).send({"message":`The note with ID:${noteID} has been deleted`})
      }else{
          res.send({"msg":"You are not authorized"})
      }
     
    }catch(err){
      res.status(400).send({"error":err})
    }
  })



module.exports={noteRouter}
