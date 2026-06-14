const jwt = require("jsonwebtoken")

async function usermiddleware(req,res,next){
const token = req.cookies.token
  if(!token){
    return res.status(401).json("token must be required")
  }

  let decoded = null

  try{
    decoded = jwt.verify(token,process.env.JWT_TOKEN)

  }
  catch(err){
    return res.status(401).json({
      message:"unauthorized Access",
      error:err.message
    })
  }

  req.user = decoded
  next()
}


module.exports = usermiddleware