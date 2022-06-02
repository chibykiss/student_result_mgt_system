const jwt = require("jsonwebtoken")
 exports.verifyadmin = async (req,res,next) => {
     if(!req?.cookies?.jwt) return res.status(403).json('no cookie provided for the request')
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json("you did not provide auth string")
    const token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,admin) => {
        if(err) return res.status(403).json("Token is not valid")
        req.admin = admin
        next()
    })
}