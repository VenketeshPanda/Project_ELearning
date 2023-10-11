const express=require('express')
const router=express.Router()
const {Course,validate}=require('../Models/courseModel')
const {Category}=require('../Models/categoryModel')

router.get('/',async (req,res)=>{
    const course=await Course.find()
    if(!course) res.send('Please add more courses')
    res.send(course)   
})

router.post('/',async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const category = await Category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid ID')
    const course=new Course({
        title:req.body.title,
        category:{
            _id: category._id,
            name: category.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    })
    await course.save()
    res.send(course)
})

router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const course=Course.findByIdAndUpdate({
        title:req.body.title, 
        category:{
            
        },
        creator:req.body.creator,
        rating:req.body.rating
    },{new: true})
    if(!course) return res.status(400).send('The course with given ID is not present in the DB')
    res.send(course)
})

router.delete('/:id',async (req,res)=>{
    const course=Course.findByIdAndDelete(req.params.id)
    if(!course) return res.status(400).send('Course not found')
    res.send('Course deleted')
})

module.exports=router