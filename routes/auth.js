/* 
 Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controladores/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post ('/',[
  check('email','el correo es obligatorio').not().isEmpty(),
  check('password','el password men').not().isEmpty(),
  validarCampos
],
login );






module.exports = router;