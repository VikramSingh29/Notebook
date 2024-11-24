const express = require('express')
const app = express()
const connectToMongoDB = require('./server')
const port = 8080;
connectToMongoDB();

// Express Middleware
app.use(express.json())


//Availble Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/auth',require('./routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
