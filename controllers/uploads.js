const { request, response } = require("express");


const cargarArchivo= (req= request, res= response)=> {

    res.json({
        msg: "Subir archivo"
    });
}


module.exports= {
    cargarArchivo
}