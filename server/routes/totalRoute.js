const express = require("express")
const router = express.Router()
const totals = require("../controllers/countItemsController")

router.get('/', totals)

module.exports = router