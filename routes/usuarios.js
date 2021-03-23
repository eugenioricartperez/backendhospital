
/*
  Ruta:  /api/usuarios 
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } =require('../middlewares/validar-campos.js')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require ('../controladores/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

//Recoger usuarios
router.get('/',validarJWT, getUsuarios);

router.post('/',
    [
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('password','El password es obligatorio').not().isEmpty(),
      check('email','El email es obligatorio').isEmail(),
      validarCampos
    ], crearUsuario);
 
    //actualizar usuarios

    router.put('/:id',
    [
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('email','El email es obligatorio').not().isEmpty(),
      check('role','el role es obligatorio').isEmpty(),
      validarCampos
    ], actualizarUsuario);

    router.delete('/:id',
    validarJWT,
      borrarUsuario
    );









module.exports = router;