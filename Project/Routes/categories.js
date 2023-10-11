const express = require('express')
const router = express.Router()
const {Category,validate} = require('../Models/categoryModel')




router.get('/', async (req, res) => {
    let categories = await Category.find()
    res.send(categories)
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(400).send('Course not found')
    res.send(category)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    else {
        const category = new Category({      //Document of the model
            name: req.body.name
        })
        await category.save()        //Save should always be on the doc
        res.send(category)
        console.log(category)
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!category) res.status(404).send('Category not found')
    res.send(category)
})

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id)
    if (!category) res.status(404).send('Category not found')
})



module.exports = router