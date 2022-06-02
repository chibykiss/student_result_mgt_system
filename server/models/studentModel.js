const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    registration_no: {
        type: Number,
        unique: true,
        required: true,
        dropDups: [true, 'regno cannot be the same']
    },
    student_email: {
        type: String,
          required: [true, 'Please enter Email Address'],
          unique: true,
          lowercase: true,
          dropDups: [true, 'theres error in duplicates']
        },
    gender: {
        type: String,
        enum: ['Male','Female', 'Other'],
        required: true
    },
    dob : {
        type: String,
        required:true
    },
    class_id:{type: mongoose.Types.ObjectId, ref: 'classes' },
    subject_id:[{type: mongoose.Types.ObjectId, ref: 'Subjects' }],
    results: [{type: mongoose.Types.ObjectId, ref: 'results'}],
    status: {
        type: Boolean,
        default: 1
    },
}, { timestamps: true })

const student = mongoose.model('student', studentSchema)
module.exports = student