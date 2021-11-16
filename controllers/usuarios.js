const {response, request} = require('express');
const bcryptjs= require('bcryptjs');

const Usuario= require('../models/usuario');


const usuariosGet= async(req= request, res= response)=> {
    const { limit= 5, desde= 0 } = req.query;
    const query= { estado: true };

    // const usuarios= await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const total= await Usuario.countDocuments(query);

    const [ total, usuarios ]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    res.json({
        total,
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

const usuariosDelete= async(req, res= response)=> {
    const id= req.params.id;
    // const uid= req.uid;

    //Borrar fisicamente
    // const usuario= await Usuario.findByIdAndDelete(id);

    const usuario= await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json( usuario );
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