const { request, response } = require("express")


const validarArchivoSubir= (req= request, res= response, next)=> {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay archivos en la peticion  ---> validar Archivo al Subir 1'
        });
    }

    if (!req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos en la peticion  ---> validar Archivo al Subir 2'
        });
    }

    next();
}


module.exports= {
    validarArchivoSubir,
}