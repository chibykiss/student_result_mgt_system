const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: [true, 'theres error in duplicates']
    },
    password: {
        type: String,
        required: true
    },
    refreshtoken: {
        type: String,
        default: null
    }
},{timestamps:true})

module.exports = mongoose.model('admin', adminSchema)