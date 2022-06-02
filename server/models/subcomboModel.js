const mongoose = require('mongoose')

const subcomboSchema = mongoose.Schema({
    student_id: {type: mongoose.Types.ObjectId, ref: 'student' },
    subject_id:{type: mongoose.Types.ObjectId, ref: 'Subjects' },
    status: {
        type: Boolean,
        default: 1
    }
}, {timestamps:true})

module.exports = mongoose.model('SubjectCombo', subcomboSchema)