const path= require('path');
const { request, response } = require("express");


const cargarArchivo= (req= request, res= response)=> {

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

    const { archivo } = req.files;
    const nombreCortado= archivo.name.split('.');
    const extension= nombreCortado[ nombreCortado.length - 1 ];

    //validar la extension
    const extensionesValidas= ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg: `La extension ${extension} no es permitida, ${extensionesValidas}`
        });
    }


    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err)=> {
        if (err) {
            return res.status(500).json({ err });
        }

        res.json({
            msg: 'File uploaded to ' + uploadPath
        });
    });
}


module.exports= {
    cargarArchivo
}