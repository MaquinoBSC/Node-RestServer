const { request, response } = require("express");
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");


const login= async(req= request, res= response)=> {
    const { correo, password }= req.body;

    try {
        //Verificar si el correo existe
        const usuario= await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario/Password no son correctos -correo"
            })
        }

        //Verificar si el usuario esta activo en BD
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario/Password no son correctos -estado"
            })
        }

        //Verificar la contraseña
        const validPassword= bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario/Password no son correctos -password"
            });
        }

        //Generar el KWT
        const token= await generarJWT( usuario.id );
        
        res.json({
           usuario,
           token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}


module.exports= {
    login,
}