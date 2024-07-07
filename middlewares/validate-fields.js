const { response } = require('express'); 
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {

    //Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}


module.exports = {
    validateFields
}