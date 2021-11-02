const {response, request} = require('express');
const bcryptjs= require('bcryptjs');

const Usuario= require('../models/usuario');


const usuariosGet= async(req= request, res= response)=> {
    const { limit= 5, desde= 0 } = req.query;
    const usuarios= await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limit))

    res.json({
        usuarios
    });
}

const usuariosPut= async(req, res= response)=> {
    const id= req.params.id;
    const { _id, password, google, ...resto }= req.body;

    // TODO validar contra base de datos

    if(password){
        // Encriptar contraseña
        const salt= bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password, salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "put API- Controlador",
        usuario,
    })
}

const usuariosPost= async (req, res= response)=> {   
    const {nombre, correo, password, rol}= req.body;
    const usuario= new Usuario({nombre, correo, password, rol});

    // encriptar contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password, salt);

    // guardar en base de datos
    await usuario.save();

    res.json(usuario);
}

const usuariosDelete= (req, res= response)=> {
    res.json({
        msg: "Delete API- Controlador",
    })
}

const usuariosPatch= (req, res= response)=> {
    res.json({
        msg: "Patch API- Controlador",
    })
}

module.exports= {
    usuariosGet,
    usuariosPut, 
    usuariosPost, 
    usuariosDelete,
    usuariosPatch
}