require('dotenv').config();

const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;

const connectToMongoDB=()=>{
    mongoose.connect(mongoUri)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>{console.log('Failed to Login',err)});
}
module.exports = connectToMongoDB;