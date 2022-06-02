const express = require('express')
const router = express.Router()
const {verifyadmin} = require('../middlewares/AuthMiddleware')
const {getfloop, submitresult, getResult, resultedit, deleteresult, SingleRes, updateresult} = require('../controllers/resultController')

//check result route for the svelte front end
router.get('/specific/:email/:reg_no', getResult)
//get all options
router.get('/all', verifyadmin, getfloop)
//submit a result  to result table
router.post('/', verifyadmin, submitresult)
//get all results for edit
router.get('/', verifyadmin, resultedit)
//delete result
router.delete('/:resid/:stdid/:subid', verifyadmin, deleteresult)
//get one for update
router.get('/single/:resultid', verifyadmin, SingleRes)
//update result
router.patch('/:resid', verifyadmin, updateresult)

module.exports = router