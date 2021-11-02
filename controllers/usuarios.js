const {response, request} = require('express');
const bcryptjs= require('bcryptjs');

const Usuario= require('../models/usuario');


const usuariosGet= (req= request, res= response)=> {
    const {q, nombre, apikey, page= 1, limit= 1}= req.query;

    if(nombre === undefined){
        res.json({
            status: "error",
            msg: "el nombre es requerido",
        });
        return
    }

    res.json({
        msg: "get API- controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut= async(req, res= response)=> {
    const id= req.params.id;
    const { password, google, ...resto }= req.body;

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

    // Verificar si el correo existe
    // const existeEmail= await Usuario.findOne({correo: correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg: 'El correo ya existe'
    //     })
    // }

    // encriptar contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password, salt);

    // guardar en base de datos
    await usuario.save();

    res.json({
        msg: "Post API- Controlador",
        usuario
    });
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