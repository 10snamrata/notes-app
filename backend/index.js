const express=require("express")
require("dotenv").config()
const{connection}=require("./config/db")
const{userRouter}=require("./routes/user.routes")
const{noteRouter}=require("./routes/note.routes")
const cors=require("cors")
const bodyParser = require("body-parser")

const app=express()

app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(process.env.PORT,async()=>{
    try{
   await connection 
   console.log(`Server is running at port ${process.env.PORT}`);
   console.log("Connected to db");
    }catch(err){
     console.log("error",err);
    }
    
})