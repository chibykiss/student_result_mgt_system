const express = require('express');
const { process_params } = require('express/lib/router');
const router = express.Router();
const Student = require('../models/studentModel')
const Klass = require('../models/classModel')

//create a student
router.post('/', async (req,res)=>{
    const email = req.body.email
    // console.log(email);
    let student = await Student.findOne({student_email : email});
    //console.log(student);
    //process.exit(1)
    if (student) return res.status(400).json({message:"Email Already Exists."});
    const dstudent = new Student({
        student_name: req.body.student_name,
        registration_no: req.body.reg_no,
        student_email: email,
        gender: req.body.gender,
        dob: req.body.dob,
        class_id: req.body.class_id,

    })

    try {
        const saveStd = await dstudent.save()
       const updateklass = await Klass.findById(req.body.class_id)
        updateklass.students.push(saveStd._id)
        const updatedklass = await updateklass.save()
        res.json(updatedklass)
        //res.json(saveStd)
    } catch (error) {
        res.json({message:error.message})
    }
})

//delete a student
router.delete('/:std_id', async (req,res) => {
    try {
        const delstd = await Student.deleteOne({_id: req.params.std_id})
        res.json(delstd)
    } catch (error) {
        res.json({message: error.message})
    }
})

//get all students
router.get('/', async (req,res) => {
    try {
        const allStds = await Student.find().populate('class_id')
        res.json(allStds)
    } catch (error) {
        res.json({message: error.message})
    }
})

//get one student
router.get('/:std_id', async (req,res) => {
    try {
        const oneStd = await Student.findById({_id: req.params.std_id})
        res.json(oneStd)
    } catch (error) {
        res.json({message: error.message})
    }
})

//update student
router.patch('/:std_id', async (req,res) => {
    try {
        const updatedStd = await Student.updateOne(
            {_id: req.params.std_id},
            {$set: {
                student_name : req.body.student_name,
                registration_no: req.body.reg_no,
                student_email: req.body.email,
                gender: req.body.gender,
                dob: req.body.dob,
                class_id: req.body.class_id,
                status: req.body.status
            }}
        )
        res.json(updatedStd)
    } catch (error) {
        res.json({error: error.message})
    }
})
module.exports = router