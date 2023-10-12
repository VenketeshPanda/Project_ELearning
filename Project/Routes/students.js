const express = require('express')
const boolean = require('joi/lib/types/boolean')
const router = express.Router()
const { Student, validate } = require('../Models/studentModel')
const { Course } = require('../Models/courseModel')

router.get('/', async (req, res) => {
    let students = await Student.find()
    res.send(students)
})

router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id)
    if (!student) res.status(400).send('Student of ' + req.params.id + ' not found')
    res.send(student)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = await Course.findById(req.body.courseId)
    if (!course) return res.status(400).send('Course not found with that id')
    const student = new Student({      //Document of the model
        name: req.body.name,
        courseEnrolled: {
            _id: course._id,
            title: course.title,
            category: course.category,
            creator: course.creator,
            rating: course.rating
        },
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone
    })
    await student.save()        //Save should always be on the doc
    res.send(student)
    console.log(student)

})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    const course = await Course.findById(req.body.courseId)
    if (!course) return res.status(400).send('Course not found with that id')
    const student = await Student.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        courseEnrolled: {
            _id: course._id,
            title: course.title,
            category: course.category,
            creator: course.creator,
            rating: course.rating
        },
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone
    }, { new: true })
    if (!student) res.status(404).send('Student not found')
    res.send(student)
})

router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id)
    if (!student) res.status(404).send('Student not found')
    res.send('Student Deleted')
})



module.exports = router