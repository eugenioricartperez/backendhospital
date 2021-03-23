
const { response } = require('express');
const Usuario = require('../models/usuario');
const encryptar = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

     //verificar email
     const usuarioDB = await Usuario.findOne({email});

     if (!usuarioDB) {
         return res.status(404).json({
             ok:false,
             msg:'su usuario o contraseña no son correctos'
         });
     }
     //verificar password 
     
     const validPassword = encryptar.compareSync(   password,usuarioDB.password);
 // validPassword = password,usuarioDB.password;
     if (!validPassword){
         return res.status(400).json({
             ok:false,
             msg:'Email/password no valido '
         });
     }

     //Generar Token


      const token = await generarJWT(usuarioDB._id);



        res.json({
            ok:true,
            token:token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'+error
        });
        
    }

};




module.exports = { login }