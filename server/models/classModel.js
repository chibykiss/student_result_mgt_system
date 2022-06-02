const mongoose = require('mongoose')
const { Schema } = mongoose
const classSchema = Schema({
    class_name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }]
},{timestamps:true})

module.exports = mongoose.model('classes', classSchema)