const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const createToken = (_id)=>{
    // (the value to be signed, secret key)
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'1d'})
}

// Register
router.post('/register', async (req, res)=>{

    

    try{
        // checkig for duplicate email
        const exists= await User.findOne({email:req.body.email});

        if(exists)
        {
            throw Error('Email already in Use')
        }
        if((!req.body.email || !req.body.password)||!req.body.username)
        {
            throw Error("All fields must be filled")
        }
        if(!validator.isEmail(req.body.email))
        {
            throw Error('Email is not valid')
        }
        // Generate hashed password
        const email = req.body.email
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Creates new user
        const newUser = new User({
            username: req.body.username,
            email: email,
            password: hashedPassword,
        });

        // save user and return response
        const user = await newUser.save();

        const token = createToken(user._id);

        // console.log(user);
        res.status(200).json({ email ,token});
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Login
router.post('/login', async (req, res)=>{
    try{
        // Find user
        const user = await User.findOne({email:req.body.email});
        // !user && res.status(400).json("Wrong credentials!");
        if((!req.body.email || !req.body.password))
        {
            throw Error("All fields must be filled")
        }
        if(!user)
        {
            throw Error('Invalid Email');
        }

        // Validate password
        const validated = await bcrypt.compare(req.body.password, user.password);

        if(!validated)
        {
            throw Error('Wrong Password');
        }
        // !validated && res.status(400).json("Wrong credentials!");

        const token = createToken(user._id);

        res.status(200).json({email:user.email, token})

        // Send response
    }catch(err){
        res.status(400).json(err.message)
    }
})

router.get('/user', async (req, res)=>{
    try{
        const email = req.body.email;
        const userId = await User.findOne({email:email});
        res.status(200).json({userId:userId._id})
    }catch(err)
    {
        res.status(400).json(err)
    }
})

module.exports = router;