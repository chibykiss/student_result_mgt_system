const Students = require("../models/studentModel")
const Classes = require("../models/classModel")
const Subjects = require("../models/subjectModel")
const Results = require("../models/resultModel")

const countItems = async (req,res) => {
    const totalStudents = await Students.count()
    const totalClasses = await Classes.count()
    const totalSubjects = await Subjects.count()
    const totalResults = await Results.count()
    res.json({totalStudents, totalClasses, totalSubjects, totalResults})
}

module.exports = countItems