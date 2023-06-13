const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 8000
const AuthRoute = require('./routes/auth')
const postRoute = require('./routes/post')

// Connect to DB
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to MongoDB')
}).catch(err=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())

app.use(helmet())
app.use(morgan('common'))
app.use(cookieParser())

app.use('/api/auth',AuthRoute)
app.use('/api/post', postRoute)

// app.get('/', (req, res)=>{
//     res.send('Hello World')
// })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})