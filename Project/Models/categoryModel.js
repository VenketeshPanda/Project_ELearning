const Joi = require('joi')
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({              //Schema
    name: { type: String, required: true }
})

const Category = new mongoose.model('Category', categorySchema)  //Model


function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema)
}

exports.Category=Category
exports.categorySchema=categorySchema
exports.validate=validateData