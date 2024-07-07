const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    //x-token en headers
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token'
        })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);

        const { uid, name } = decoded;

        if (!decoded.uid || !decoded.name) {
            return res.status(401).json({ ok: false, msg: 'Invalid token structure' });
        }

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();

}

module.exports = {
    validateJWT
}