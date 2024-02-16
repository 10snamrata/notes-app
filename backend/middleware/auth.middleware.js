const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        // jwt.verify(token,"masai",(err,decoded)=>{
        // })
        //or without callback function

        const decoded=jwt.verify(token,"masai")
        if(decoded){
            //  console.log(decoded);
            req.body.userID=decoded.userID
            req.body.author=decoded.author
            next()
        }else{
            res.send("You are not authorized")
        }
    }else{
        res.send("You are not authorized")
    }
}

module.exports={auth}