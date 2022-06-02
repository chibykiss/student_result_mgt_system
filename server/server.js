const express = require('express');
require('dotenv').config()
const cors = require('cors')
const credentials = require("./middlewares/setCredentails")
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/db');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();

//middlewares will be here
app.use(credentials)
app.use(cors(corsOptions))
connectDB()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', (req,res)=> {
    res.send('hello');
})

//get the admin routes and use it
const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)

//lets get the result route and use it
const resultRoute = require('./routes/resultRoutes');
app.use('/result', resultRoute)

const {verifyadmin} = require('./middlewares/AuthMiddleware');
app.use(verifyadmin)
//lets get all counts and use it
app.use('/total', require("./routes/totalRoute"))

//lets get the class route and use it
const classRoute = require('./routes/classRoute')
app.use('/class', classRoute)

//lets get the student route and use
const studentRoute = require('./routes/studentRoute')
app.use('/students', studentRoute)

//lets get the subjects route and use it
const subjectRoute = require('./routes/subjectRoute')
app.use('/subject', subjectRoute)

//lets get the subjects combinations route and use it
const subjectcomboRoute = require('./routes/subcomboRoute')
app.use('/subcombo', subjectcomboRoute)



//listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT)