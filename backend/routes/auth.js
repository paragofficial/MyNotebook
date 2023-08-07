const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'paragisagoodboy';


//Route 1: create a user using :POST "/api/auh/createuser". No login required 
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req,res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
    //  check whether  the user with tis email existe already 
    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success, error: "sorry a user with  this email already exixts"})
    }
    const salt =await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password, salt);
    // create a new user 
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      
      const data={
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success, authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");
    }
})

//Route 2: Authenticate a user using :POST "/api/auth/login". No login required 
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password} = req.body;
      try{
        let user =await User.findOne({email});
        if(!user){
          success = false;
          return res.status(400).json({error: "Please login with valid credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
          success= false;
          return res.status(400).json({success, error: "Please login with valid credentials"});
        }
        const data={
          user:{
            id: user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success, authtoken})
      }catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server occured");
      }
})

// Route 3: Get loggedin user details using :POST "/api/auh/getuser". login required 
router.post('/getuser',fetchuser, async (req,res)=>{

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server occured");
}
})
module.exports = router