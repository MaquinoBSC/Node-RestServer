const {response} = require('express');


const usuariosGet= (req, res= response)=> {
    res.json({
        msg: "get API- controlador",
    })
}

const usuariosPut= (req, res= response)=> {
    res.json({
        msg: "put API- Controlador",
    })
}

const usuariosPost= (req, res= response)=> {
    const body= req.body;
    const {nombre}= req.body;

    res.json({
        msg: "Post API- Controlador",
        body,
        nombre
    })
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