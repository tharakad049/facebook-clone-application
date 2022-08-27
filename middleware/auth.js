const jwt=require('jsonwebtoken')
require('dotenv').config()

module.exports=function(req,res,next){
    const token=req.headers.authorization.split(' ')[1];

    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
        if(token==null){
            res.sendStatus(401)
        }else{
            jwt.verify(token,process.env.TOKEN_KEY,(err,surname)=>{
                if(err){
                    res.sendStatus(403)
                }else{
                    next()
                }
            })
        }
    }else{
        res.sendStatus(403)
    }
}
