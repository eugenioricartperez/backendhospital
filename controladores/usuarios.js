const { response } = require('express');
const encryptar = require('bcryptjs');

//importamos el modelo 

const { validationResult } =require('express-validator');

const  Usuario  = require(  '../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {

  const usuarios=  await Usuario.find({});

try {
  
  res.json({
      ok:true,
      usuarios:usuarios,
      uid: req.uid

  });
} catch(error){
  console.log(error);
  res.status(500).json({
     ok: false,
     msg:'error inesperado ... revisar log'
  });

}


};



const crearUsuario = async (req, res= response) => {
  
  console.log(req.body);

  const {email, password, nombre } = req.body;


  try {
    

const existeEmail = await Usuario.findOne({ email: email });

if (existeEmail)  {
    return res.status(400).json({
       ok:false,
       msg: 'El correo existe '
    });
}

    const usuario = new Usuario( req.body);
  
//encriptar el password antes de grabar el BBDD

  const salt = encryptar.genSaltSync(10);

  usuario.password = encryptar.hashSync ( password ,salt);
/*  encryptar.hash(    password,10, (err,hash)=>{
    usuario.password=hash;
  }); */
  
  await usuario.save();
    
    res.json({
       ok:true,
       usuario: usuario,
        token : await generarJWT(usuario._id)
         });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error Insertando Usuario'
    });
  }

};

const getUsuariobyId =async (req,res) =>{
  try {
    const uid = req.params.id;
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
    
    } else {

    }
  } catch (error) {
    
  }
}


const actualizarUsuario = async (req,res = response) => {

try {
  const uid = req.params.id;
  const usuario = await Usuario.findById(uid);
  if (!usuario) {
    return res.status(404).json({
      ok:false,
      msg:'No existe usuario con ese id'
    });

  }

//TODO: Validar Token y usuario correcto 



  const { google, email, ...campos } = req.body;
  console.log('el email es ',campos.email);
  //delete campos.password;
  if ( usuario.email != email ) {
     const existeEmail = await Usuario.findOne({email: email });
     if (existeEmail){
       return res.status(400).json({
         ok:false,
         msg:'Existe un usuario con dicho Email'
       });
     }

   }

   campos.email = email;
   const salt = encryptar.genSaltSync(10);
   campos.password = encryptar.hashSync(campos.password,salt);
/*    encryptar.hash(    password,10, (err,hash)=>{
    campos.password=hash;
  }); */
  // delete campos.password;
  // delete campos.google;
//Actualiza y regresa el 
//const usuarioActualizado = await Usuario.findByIdAndUpdate( uid,campos);

  const usuarioActualizado = await Usuario.findByIdAndUpdate( uid,campos , {new : true });

  res.status(200).json({
    ok:true,
    msg:usuarioActualizado.toJSON()
  });
} catch (error) {
  console.log(error);
  res.status(500).json({
    ok:error,
    msg:'Error Inesperado'+campos.password
  });
}

};



const borrarUsuario = async(req,res) =>{
 
  const uid = req.params.id;
  const usuario = await Usuario.findById(uid);
  if (!usuario) {
    return res.status(404).json({
      ok:false,
      msg:'No existe usuario con ese id'
    });

  }
  const usuarioBorrado = await Usuario.findByIdAndDelete(req.params.id);
    
    try {
      res.status(200).json({
        ok:true,
        uid:usuarioBorrado.uid
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'error inesperado'
      });
    }
  };


    module.exports= {
           getUsuarios,
           crearUsuario,
           actualizarUsuario,
           borrarUsuario
    };