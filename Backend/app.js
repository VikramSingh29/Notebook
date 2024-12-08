const express = require('express')
const cors = require('cors')
const app = express()
const connectToMongoDB = require('./server')
const port = 8080;
connectToMongoDB();

// Express Middleware
app.use(express.json())
app.use(cors())

//Availble Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
