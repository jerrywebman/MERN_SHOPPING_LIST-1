const express = require('express');
//creating a router variable from the express.Router object
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//bring in our User module ../outside of the api folder ../outside of the routes folder
const Item = require('../../models/User');

//@route post api/users
//@desc register
//@access public

router.post('/',(req, res) =>{
    //using destructuring to pullout the values from the request
       const {name, email, password} = res.body;

       //simple validation
       if(!name || !email || !password){
           return res.status(400).json({ msg:'please enter all fields'});
       }

       //checking for existing user using the email 
       User.findOne({email})
       .then(user =>{
           //if there is an existing user
           if(user) return res.status(400).json({ msg: 'user already exists with that email'});
           //if the user dosent exits
           const newUser = new User({
               name,
               email,
               password
           });
// to create an hash and salt we require bcrypt above we installed and use it below
bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash) =>{
        //once we get the hash we check for the errors
        if(err) throw err;
        //saving the plain text password as hash
        newUser.password = hash;
        //save user to db
        newUser.save()
        .then(user =>{
            //add the jwt here and sign it in
            jwt.sign(
                //send the token with the user id
                {id: user.id},
                //secret value
                config.get('jwtSecret'),
                //this is optional if you want the token to expire
                { expiresIn: 3600},
                //call back for error
                (err, token)=>{
                    if(err) throw err;
                    res.json({
                        //once its registered give us the user and the token
                        token,
                        user:{
                            id: user.id,
                            name:user.name,
                            email:user.email
                        }
                    });
                }
               
            )
            
        });
    })
})
       })
});

module.exports = router;    