const express = require('express');
//creating a router variable from the express.Router object
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//bring in our User module ../outside of the api folder ../outside of the routes folder
const Item = require('../../models/User');

//@route post api/auth
//@desc authenticate user
//@access public

router.post('/', (req, res) => {
    //using destructuring to pullout the values from the request
    const { email, password } = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'please enter all fields' });
    }

    //checking for existing user using the email 
    User.findOne({ email })
        .then(user => {
            //if there is no user with the details
            if (!user) return res.status(400).json({ msg: 'user does not exists' });

            //validate password
            //password is the plaintext password and 
            //user.password is the hashed password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    //add the jwt here and sign it in
                    jwt.sign(
                        //send the token with the user id as a payload
                        { id: user.id },
                        //secret value
                        config.get('jwtSecret'),
                        //this is optional if you want the token to expire in an hour
                        { expiresIn: 3600 },
                        //call back for error
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                //once its registered give us the user and the token
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }

                    )
                })
        })
});

//@route get api/auth/user
//@desc get user
//@access private
// '/user' because we are in the auth file
router.get('/user', auth, (req, res) => {
    //passing the id
    User.findById(req.user.id)
        //disregarding the password
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;    