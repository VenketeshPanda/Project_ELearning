const mongoose=require('mongoose')
const Joi=require('joi')
const {categorySchema}=require('../Models/categoryModel')

const courseSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    category:{
        type: categorySchema,
        required: true
    },
    creator:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    }
})

const Course = mongoose.model('Course',courseSchema)

function validateData(course) {
    const schema = {
        title: Joi.string().required(),
        categoryId: Joi.string().required(),
        creator: Joi.string().required(),
        rating: Joi.number().required()
    }
    return Joi.validate(course, schema)
}
exports.Course=Course
exports.validate=validateData
