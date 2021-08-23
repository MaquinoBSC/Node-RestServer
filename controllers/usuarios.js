const {response, request} = require('express');


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

const usuariosPut= (req, res= response)=> {
    const id= req.params.id;

    res.json({
        msg: "put API- Controlador",
        id
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