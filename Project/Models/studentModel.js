const mongoose = require('mongoose')
const {courseSchema} = require('../Models/courseModel')
const Joi = require('joi')

const studentSchema = mongoose.Schema({              //Schema
    name: { type: String, required: true },
    isEnrolled:{
        type:Boolean,
        default:false
    },
    courseEnrolled:{
        type: courseSchema,
        required: true
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
        courseId: Joi.string().required(),
        phone: Joi.number().min(10).required()
    }
    return Joi.validate(category, schema)
}


exports.Student =Student
exports.validate =validateData