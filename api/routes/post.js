const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)


router.get('/:email/timeline', async (req, res)=>{
    try{
        const email = req.params.email;
        const currentUser = await User.findOne({email:email});
        const currentuserId = currentUser._id;
        const userPosts = await Post.find({userId :currentuserId})
        res.status(200).json(userPosts);
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;