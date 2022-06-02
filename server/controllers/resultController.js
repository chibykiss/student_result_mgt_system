const klass = require('../models/classModel')
const Student = require('../models/studentModel')
const Result = require('../models/resultModel')
const Subject = require('../models/subjectModel')

//get all options
 exports.getfloop = async (req,res) => {
    try {
        const getall = await Student.find()
        .populate('subject_id').populate('class_id')
        // const getall = await klass.find().populate('students').populate('student_id')
         res.json(getall)
        
    } catch (error) {
        res.json({error: error.message})
    }
}

//submit a result  to result table
exports.submitresult = async (req,res) => {
    const {klasId,stdId,subId,dmark} = req.body
    const dixresult = new Result({
        student_id: stdId,
        class_id: klasId,
        subject_id: subId,
        mark: dmark,
    })
    try {
        const resultexist = await Result.find({class_id:klasId, student_id:stdId,subject_id:subId})
        if(resultexist.length !== 0) return res.status(401).json({message: "you have added this subject"})
        //process.exit(1)
        const savedresult = await dixresult.save()
        const saveStd = await Student.findById(stdId)
        const saveSub = await Subject.findById(subId)
        saveStd.results.push(savedresult._id)
        saveSub.results.push(savedresult._id)
        const updatedres = await saveStd.save()
        const updatedsavesub = await saveSub.save()
        res.json(updatedsavesub)
        //res.json(savedresult)
    } catch (error) {
        res.json({error:error.message})
    }
}

//get the result of a specific student from the student email and registration number
exports.getResult = async (req,res) => {
    try {
        //console.log('request in sub')
        const studentresult = await Student.find(
            {student_email : req.params.email,registration_no: req.params.reg_no}
        ).populate('class_id')
        .populate({
            path: 'results',
            populate: {
                path: 'subject_id',
            }
        })
        if(studentresult.length === 0) return res.status(404).json(studentresult)
        res.json(studentresult)
    } catch (error) {
        res.json({error: error.message})
    }
}

//get a specific result with result id for edit
exports.SingleRes = async (req,res) => {
    //console.log('the request is coming here');
    const {resultid} = req.params;
    try {
        const getone = await Result.findById(resultid)
        .populate('subject_id').populate('student_id')
        res.json(getone)
    } catch (error) {
        res.json({error: error.message})
    }
}

//get all results for edit
exports.resultedit = async(req,res) => {
    try {
        const getall = await Result.find()
        .populate('class_id').populate('student_id').populate('subject_id')

        res.json(getall)
    } catch (error) {
        res.json({error: error.message})
    }
 
}


//update result
exports.updateresult = async(req,res) => {
    try {
        const updateres = await Result.updateOne(
            { _id: req.params.resid}, 
            { $set: { mark: req.body.dmark} })
        res.json(updateres)
    } catch (error) {
        res.json({error:error.message})
    }
}

//delete result with the result id,studentid and subjectid
exports.deleteresult = async(req,res) => {
    const {resid, stdid, subid} = req.params
    try {
        const stdresdel = await Student.findOneAndUpdate({ _id: stdid }, {
            $pull: {
                results: resid,
            },
        });
        const subresdel = await Subject.findOneAndUpdate({ _id: subid }, {
            $pull: {
                results: resid,
            },
        });
        const rtdelete = await Result.deleteOne({_id: resid})
        res.json(stdresdel)
    } catch (error) {
        res.json({error:error.message})
    }
}
