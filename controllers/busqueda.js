const { request, response } = require("express");


const buscar= (req= request, res= response)=> {
    const { coleccion, termino }= req.params;

    res.status(200).json({
        msg: "buscando...",
        coleccion,
        termino
    });
}


module.exports= {
    buscar
}