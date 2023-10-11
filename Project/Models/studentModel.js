const mongoose = require('mongoose')
const Joi = require('joi')

const studentSchema = mongoose.Schema({              //Schema
    name: { type: String, required: true },
    isEnrolled:{
        type:Boolean,
        default:false
    },
    phone:{
        type: String,
        required:true,
        minLength: 10
    }
})

const Student = new mongoose.model('Student', studentSchema)  //Model


function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required(),
        isEnrolled: Joi.boolean(),
        phone: Joi.number().min(10).required()
    }
    return Joi.validate(category, schema)
}


exports.Student =Student
exports.validate =validateData