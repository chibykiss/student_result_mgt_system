const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
    student_id: {type: mongoose.Types.ObjectId, ref: 'student' },
    class_id: {type: mongoose.Types.ObjectId, ref: 'classes' },
    subject_id:{type: mongoose.Types.ObjectId, ref: 'Subjects' },
    mark: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    }
},{timestamps:true})

module.exports = mongoose.model('results', resultSchema)