const express = require('express')
const router = express.Router()
const dclass = require('../models/classModel')

//Create new Class
router.post('/', async (req,res)=>{
    //check if class already exists
    const {class_name,section} = req.body;
    //const kexist = dclass.find({class_name: class_name})
    //console.log(kexist)
    // if(kexist.length !== 0) return res.status(409).json("class name already exists")
    //linking model with data from req body
        const dixclass = new dclass({
            class_name: class_name,
            section: section,
        })

        
        try {
            const saveClass = await dixclass.save()
            res.json(saveClass)
        } catch (error) {
            res.json({message:error.message})
        }
})

//get all classes
router.get('/', async (req,res) => {
    try {
        const allclasses = await dclass.find()
        res.json(allclasses)
    } catch (error) {
        res.json({message: error.message})
    }
})

//get one class only
router.get('/:class_id', async (req,res) => {
    try {
        //const doesUserExit = await dclass.exists({ _id: req.params.class_id });
        const sclass = await dclass.findById(req.params.class_id)
        res.json(sclass)
    } catch (error) {
        res.json({message: error.message})
    }
})

//update a class
router.patch('/:class_id', async (req,res) => {
    try {
        const updated_post = await dclass.updateOne(
            {_id: req.params.class_id},
            {$set: {class_name:req.body.class_name, section: req.body.section}}
        )
        res.json(updated_post)
    } catch (error) {
        res.json({message: error.message})
    }
})

//delete a class
router.delete('/:class_id', async (req,res) => {
    const classid = req.params.class_id
    try {
        const findId = await dclass.exists({_id: classid})
        if(!findId) return res.status(404).json('class id not found')
        const delclass = await dclass.deleteOne({_id: classid})
        res.json(delclass)
    } catch (error) {
        res.json({message: error.message})
    }
})
module.exports = router