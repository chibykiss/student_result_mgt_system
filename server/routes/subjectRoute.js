const express = require('express')
const router = express.Router()
const Subject = require('../models/subjectModel')

//create a subject
router.post('/', async (req,res) => {
    const {name, code} = req.body

    let checksub = await Subject.find({ $or: [{ subject_name: name }, { subject_code: code }] })
    //console.log(checksub)
    if(checksub.length !== 0) return res.status(400).json({message: "subject name or code exists"})
    //process.exit(1)
    const nsubject = new Subject({
        subject_name: name,
        subject_code: code
    })
    try {
        const saveSub = await nsubject.save()
        res.json(saveSub)
    } catch (error) {
        res.json({error: error.message})
    }
})

//get all subjects
router.get('/', async (req,res) => {
    try {
        const allsub = await Subject.find()
        res.json(allsub)
    } catch (error) {
        res.json({error: error.message})
    }
})

//get one subject
router.get('/:sub_id', async (req,res) => {
    try {
        const oneSub = await Subject.findById({_id: req.params.sub_id})
        console.log(oneSub)
        res.json(oneSub)
    } catch (error) {
        res.json({error: error.message})
        
    }
})

//update subject
router.patch('/:sub_id', async (req,res) => {
    try {
       const updatedSub = await Subject.updateMany(
           {_id: req.params.sub_id},
           {$set: {subject_name: req.body.name, subject_code: req.body.code}}
           ) 
        res.json(updatedSub)
    } catch (error) {
        res.json({error: error.message})
    }
})

//Delete Subject
router.delete('/:sub_id', async (req,res) => {
    try {
        const removedSub = await Subject.deleteOne({_id: req.params.sub_id})
        if(removedSub) return res.status(201).json({message: "deleted sucessfully"})
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router