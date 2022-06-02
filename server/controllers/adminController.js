const bcrypt = require('bcrypt')
const Admin = require("../models/adminModel")
const jwt = require("jsonwebtoken")
//register admin
exports.registeradmin = async (req,res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
      }
    const dixadmin = new Admin({
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password
    })

    try {
            //generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        dixadmin.password = await bcrypt.hash(dixadmin.password, salt);
        const saveadmin = await dixadmin.save();
        res.status(200).json(saveadmin)
    } catch (error) {
        res.json({error: error.message})
    }
}

exports.loginadmin = async (req,res) => {
    try {
        const {username,password} = req.body
        if (!(username && password)) {
            return res.status(400).send({ error: "Data not formatted properly" });
        }
        const admin = await Admin.findOne({username:username})
        if(admin){
            const validatepass = await bcrypt.compare(password,admin.password)
            if(!validatepass){
                return res.status(400).json({error: "password is invalid"})
            }
            const accesstoken = jwt.sign({id:admin._id, username:admin.username}, process.env.JWT_SECRET, {
                expiresIn: "10m" // expires in 30 secs
            })
            const refreshtoken = jwt.sign({id:admin._id,username:admin.username}, process.env.REFRESH_SECRET, {
                expiresIn: "24h" // expires in 24 hrs
            })
            const storedtoken = await Admin.updateOne(
                {username:username},
                {$set: {refreshtoken:refreshtoken}}
            )
            //store the refresh token in a secure cookie
            const dcookie = res.cookie('jwt', refreshtoken, {httpOnly:true, sameSite: 'None', secure:true, maxAge: 24*60*60*1000})
            // console.log(dcookie)
            res.status(200).json({
                id: admin._id,
                username: admin.username,
                jwttoken: accesstoken,
                //refreshtoken: refreshtoken
            })
        }else{
            res.status(404).json({error: "user does not exist"})
        }
    } catch (error) {
        res.json({error: error.message})
    }
   
}

exports.refreshtoken = async (req,res) => {
    const cookies = req.cookies
        //check if the token was sent in the req body
    if(!cookies?.jwt) return res.status(401).json("cookie not found, unauthenticated")
    // console.log(cookies?.jwt)
    const refreshToken = cookies.jwt
    try {
        const getRtoken = await Admin.findOne({refreshtoken: refreshToken})
        if((getRtoken == null) || (getRtoken.length === 0)) return res.status(403).json("refresh token is not valid")
        //res.json(getRtoken)
        var adminuser = ''
        jwt.verify(refreshToken,process.env.REFRESH_SECRET,(err,admin) => {
            if(err) return res.status(403).json("Token is not valideeeee")
            adminuser = admin
        })
        //if(admin.length === 0) return res.status(403).json("token is invalid")
        const newaccesstoken = jwt.sign({adminuser},process.env.JWT_SECRET,{expiresIn: "1m"})
        // const newrefreshtoken = jwt.sign({adminuser},process.env.REFRESH_SECRET,{expiresIn: "1h"})
        // const updateRtoken = await Admin.updateOne(
        //     {refreshtoken: refreshToken},
        //     {$set: {refreshtoken:newrefreshtoken}}
        // )
            res.json({
                newaccesstoken: newaccesstoken
                //newrefreshtoken: newrefreshtoken
            });
       
      
    } catch (error) {
        res.json({error: error.message})
    }

}

exports.logoutadmin = async (req,res) => {
    const cookie = req.cookies
    if(!cookie?.jwt) return res.sendStatus(204)
    const refreshT = cookie?.jwt
    try {
        //check if refresh cookie exists in db
        const delRefreshToken = await Admin.updateOne(
            {refreshtoken:refreshT},
            {$set: {refreshtoken: null}}
        )
        res.clearCookie('jwt', {httpOnly:true,secure:true, sameSite: 'None' }) 
        res.sendStatus(204)
    } catch (error) {
        res.json({error: error.message})
    }
   
}