const { request, response } = require("express");
const { subirArchivo } = require("../helpers");



const cargarArchivo= async (req= request, res= response)=> {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            msg: 'No hay archivos en la peticion'
        });
        return;
    }

    if (!req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivos en la peticion'
        });
        return;
    }

    try {
        const nombreArchivo= await subirArchivo(req.files, undefined, 'imgs');
        
        res.json({
            path: nombreArchivo
        });

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

}


module.exports= {
    cargarArchivo
}