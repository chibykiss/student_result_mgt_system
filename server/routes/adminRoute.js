const express = require('express')
const router = express.Router()
const {verifyadmin} = require("../middlewares/AuthMiddleware")
const {registeradmin, loginadmin, logoutadmin, refreshtoken} = require("../controllers/adminController");

//register new admin route
router.post("/register", registeradmin)
router.post("/login", loginadmin)
router.get("/logout", verifyadmin, logoutadmin)
router.get("/refresh", refreshtoken)
module.exports = router