const { request, response } = require("express");
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


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


const googleSignIn= async (req= request, res= response)=> {
    const { id_token }= req.body;
    try {
        const googleUser= await googleVerify(id_token);
        console.log(googleUser);


        res.json({
            msg: "Todo bien",
            id_token,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar",
        });
    }

}


module.exports= {
    login,
    googleSignIn,
}