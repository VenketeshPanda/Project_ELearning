const express=require('express')
const app=express()
const mongoose=require('mongoose')
const students=require('./Routes/students')
const categories=require("./Routes/categories")
const courses=require('./Routes/course')

mongoose.connect('mongodb://127.0.0.1/e-learningPlatform')
.then(()=>console.log('Connection Successful!'))
.catch(err=>console.error('Couldnt connect to MongoDB',err))

app.use(express.json())
app.use('/api/categories',categories)
app.use('/api/students',students)
app.use('/api/courses',courses)

const port=process.env.PORT || 3000
app.listen(port,()=> console.log("Running on: "+port))
