const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next)=>{
  let token;  
    console.log('we are here');
    console.log('req.headers.authorization contains',req.headers.authorization);
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)        
        req.user = await User.findById(decoded.id).select('-password')
        console.log('req.user contains', req.user)
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("You are not authorized")        
    }
  }

  if(!token){
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }