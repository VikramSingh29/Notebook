const express = require('express')
const { validationResult } = require('express-validator');
const userValidationRules = require('../validators/userValidation');
const User = require('../models/User')
const router = express.Router() // Router-level middleware

//Route to create a new user

router.post('/',userValidationRules,async(req,res)=>{
 // Validate the request
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }

 try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
   // Create a new user instance
   const user = new User(req.body);

   // Save the user to the database
   await user.save();

   // Respond with success (exclude sensitive fields like the password)
   res.status(201).json({
     message: 'User created successfully',
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       password: hashedPassword,
     },
   });
 } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({
          error: 'Email already exists',
        });
      }
   // Handle errors during database operations
   res.status(500).json({ error: 'Server error. Could not create user.' });
 }
})
module.exports = router;