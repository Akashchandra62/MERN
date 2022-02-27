const express = require('express');
const { json } = require('express/lib/response');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const  User  = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');
const route = express.Router();

route.get('/about', authenticate ,(req, res) => {
    res.status(200).send(req.rootUser);

})

// route.get('/register', (req, res) => {
//     console.log("register page");
//     res.send('This is register page')

// })

route.post('/register', async (req, res) => {
    console.log(req.body)
    let { name, email, phone, work, password, cpassword } = req.body;
    try {
        if(!name || !email || !phone || !work || !password || !cpassword){
            throw {"error":"Fill all the input"};
        }
        if(password !== cpassword){
            throw {"error":"Password and Confirm-password not match"};
        }
        let user = await User.findOne({ email });
        if (!user) {
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            cpassword = await bcrypt.hash(cpassword, salt);
            user = await User.create({ name, email, phone, work, password, cpassword });
            res.status(200).json({"success":"User created Successfully..."});
        }
        else {
            throw {"error":"Email already registered"};
        }
    } catch (error) {
        // console.log(error);  
        res.status(400).json(error);
    }

})

// route.get('/login', (req, res) => {
//     res.send('This is login page')

// })

route.post('/login',async (req, res) => {
    const { email, password } = req.body;
    // console.log(email + " " + password);
    try {
        if( !email || !password ){
            throw {"error":"Invalid Details"};
        }
        const user = await User.findOne({email});
        if(!user){
            throw {"error":"Invalid Details"};
        }
        else{
            if(!(await bcrypt.compare(password, user.password))){
                throw {"error":"Invalid Details"};
            }
            else{
                const token = await user.generateAuthToken();
                res.cookie("jwtToken", token)
                // console.log("token created");
                res.status(200).json({"success":"Login successful..."});
            }
        }
        
    } catch (error) {
        res.status(400).json(error)
    }


})

route.get('/logout', authenticate ,(req, res) => {
    res.clearCookie("jwtToken")
    res.status(200).json({"success":"Logged Out"});

})

module.exports = route
