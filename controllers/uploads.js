const fs= require('fs');
const path= require('path');
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto }= require('../models');



const cargarArchivo= async (req= request, res= response)=> {

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


const actualizarImagen= async (req= request, res= response)=> {
    const { coleccion, id }= req.params;

    try {
        let modelo;
    
        switch (coleccion) {
            case 'usuarios':
                modelo= await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un usuario con el id: ${id}`
                    });
                }
                break;
            
            case 'productos':
                modelo= await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id: ${id}`
                    });
                }
                break;
        
            default:
                return res.status(500).json({ msg: "Se me olvido validar esto"});
        }
    
        // Limpiar imagenes previas
        if(modelo.img){
            //hay que borrar la img del servidor
            const pahtImagen= path.join(__dirname, '../uploads', coleccion, modelo.img);
            if(fs.existsSync(pahtImagen)){
                fs.unlinkSync(pahtImagen);
            }
        }


        const nombre= await subirArchivo(req.files, undefined, coleccion);
        modelo.img= nombre;
    
        await modelo.save();
    
        res.json(modelo);
        
    } catch (error) {
        return res.status(400).json({
            msg: error
        });
    }
}


module.exports= {
    cargarArchivo,
    actualizarImagen,
}