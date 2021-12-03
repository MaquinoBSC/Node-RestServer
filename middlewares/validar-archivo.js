const { request, response } = require("express")


const validarArchivoSubir= (req= request, res= response, next)=> {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay archivos en la peticion  ---> validar Archivo al Subir'
        });
    }

    if (!req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos en la peticion  ---> validar Archivo al Subir'
        });
    }

    next();
}


module.exports= {
    validarArchivoSubir,
}