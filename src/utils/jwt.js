const jwt = require('jsonwebtoken');

module.exports = sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"365d"});

