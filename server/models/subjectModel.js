const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    subject_name : {
        type: String,
        required: true
    },
    subject_code: {
        type: String,
        required: true
    },
    student_id: [{type: mongoose.Types.ObjectId, ref: 'student' }],
    results: [{type: mongoose.Types.ObjectId, ref: 'results'}]
}, {timestamps: true})

module.exports = mongoose.model('Subjects', subjectSchema)