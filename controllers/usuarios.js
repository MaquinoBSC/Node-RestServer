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
    res.json({
        msg: "Post API- Controlador",
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