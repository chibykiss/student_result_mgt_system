const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = require('../models/studentModel')
const Subject = require('../models/subjectModel')
const subCombo = require('../models/subcomboModel')


//create subject combo
router.post('/', async (req,res) => {
    let stdid = mongoose.Types.ObjectId(req.body.student_id)
    let subid = mongoose.Types.ObjectId(req.body.subject_id)
   
    try {
       const getstudent = await Student.findById(stdid)
       const getsubject = await Subject.findById(subid)
       if(getstudent.subject_id.includes(subid)){
        return res.status(409).json({error: 'subject already asigned to this student'});
       } 
       getstudent.subject_id.push(subid)
       getsubject.student_id.push(stdid)
       const updatedstd = await getstudent.save()
       const updatedsbt = await getsubject.save()
       const addsubcombo = new subCombo({
            student_id: stdid,
            subject_id: subid
        })
        const savedsub = await addsubcombo.save()
        //res.json(savedsub)
        res.json(updatedstd)
    } catch (error) {
        res.json({error: error.message})
    }
})

//see all subject combo
router.get('/', async (req,res) => {
    try {
        const allsubcombo = await subCombo.find()
        .populate({
            path: 'student_id',
            populate: {
                path: 'class_id',
            }
        }).populate('subject_id')
        res.json(allsubcombo)
    } catch (error) {
        res.json({error: error.message})
    }
})

//delete subject combo
router.delete('/:combo_id/:stdid/:subid', async (req,res) => {
    try {
        const firstDel = await subCombo.deleteOne({_id: req.params.combo_id})
        const secondDel = await Student.findOneAndUpdate({ _id: req.params.stdid }, {
            $pull: {
                subject_id: req.params.subid,
            },
        });
        const thirdDel = await Subject.findOneAndUpdate({ _id: req.params.subid }, {
            $pull: {
                student_id: req.params.stdid,
            },
        });
     
        res.status(200).json('deleted')
    } catch (error) {
        res.json({error: error.message})
    }
})

// toggle subject combo activation
router.get('/:combo_id', async (req,res) => {
    try {
        const gstat = await subCombo.find({_id: req.params.combo_id}).select('status')
        let dstat = gstat[0].status
        dstat == true ? dstat = false : dstat = true
        const updatestat = await subCombo.updateOne(
            {_id: req.params.combo_id},
            {$set: {status: dstat}}
            )
        res.status(200).json(updatestat)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router