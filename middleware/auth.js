const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    //get token from the request header
    const token = req.header('x-auth-token');

    //check for token
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        //verify token//its takes the token with our secret
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Add user from payload
        req.user = decoded;
        next();//this calls the next peice of middleware
    } catch (e) {
        res.status(400).json({ msg: 'Token is invalid' })
    }
}

module.exports = auth;