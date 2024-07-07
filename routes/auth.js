
//Rutas de Usuarios / Auth
//host + /api/auth

const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        
        //Use of Custom Middleware
        validateFields
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        
        //Use of Custom Middleware
        validateFields
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);



module.exports = router;