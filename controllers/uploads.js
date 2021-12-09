const fs= require('fs');
const path= require('path');
const cloudinary = require('cloudinary').v2;
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto }= require('../models');


cloudinary.config( process.env.CLOUDINARY_URL );

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


const actualizarImagenCloudinary= async (req= request, res= response)=> {
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
            const nombreArr= modelo.img.split('/');
            const nombre= nombreArr[ nombreArr.length -1 ];
            const [ public_id ]= nombre.split('.');

            cloudinary.uploader.destroy( public_id );
        }

        //Subimos la imagen
        const { tempFilePath }= req.files.archivo;
        const { secure_url }= await cloudinary.uploader.upload( tempFilePath );

        modelo.img= secure_url;
        await modelo.save();
    
        res.json(modelo);
        
    } catch (error) {
        return res.status(400).json({
            msg: error
        });
    }
}


const servirArchivo= async (req= request, res= response)=> {
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
    
        // Si existe imagen la servimos
        if(modelo.img){
            const pahtImagen= path.join(__dirname, '../uploads', coleccion, modelo.img);
            if(fs.existsSync(pahtImagen)){
                return res.sendFile( pahtImagen );
            }
        }
    
        //Si no hay imagen servimos una imagen de relleno
        const pathNoImage= path.join(__dirname, '../assets', "no-image.jpg");
        res.sendFile( pathNoImage );
        
    } catch (error) {
        return res.status(400).json({
            msg: error
        });
    }
}


module.exports= {
    cargarArchivo,
    actualizarImagen,
    servirArchivo,
    actualizarImagenCloudinary,
}