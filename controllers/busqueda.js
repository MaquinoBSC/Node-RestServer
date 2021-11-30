const { request, response } = require("express");
const { ObjectId }= require('mongoose').Types;
const { Usuario, Categoria, Producto }= require('../models')


const coleccionesPermitidas= [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];


//Buscar por terminos en la coleccion de Usuarios
const buscarUsuarios= async ( termino= '', res= response)=> {
    const isMongoID= ObjectId.isValid(termino);

    try {
        if(isMongoID){
            const usuario= await Usuario.findById(termino);
            return res.json({
                results: ( usuario ) ? [ usuario ] : [],
            });
        }
    
        const regex= new RegExp( termino, 'i');
        const usuarios= await Usuario.find({ 
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
         });
    
        res.json({
            results: usuarios
        });
        
    } catch (error) {
        console.log(error);
    }
}


//Buscar por terminos en la coleccion de categoria
const buscarCategoria= async (termino= '', res= response)=> {
    const isMongoID= ObjectId.isValid(termino);


    try {
        if(isMongoID){
            const categoria= await Categoria.findById(termino)
                .populate('usuario', ['nombre', 'correo', 'rol']);
    
            return res.status(200).json({
                results: categoria ? [ categoria ] : []
            })
        }
    
        const regex= new RegExp( termino, 'i');
        const [categorias, count]= await Promise.all([
            Categoria.find({ 
                $or: [{ nombre: regex }],
                $and: [{ estado: true }]
            }).populate('usuario', ['nombre', 'correo', 'rol']),
            Categoria.count({
                $or: [{ nombre: regex }],
                $and: [{ nombre: regex }]
            })
        ]);
    
        res.status(200).json({
            results: categorias,
            count 
        });
        
    } catch (error) {
        console.log(error);
    }
}

const buscarProducto= async (termino= '', res= response)=> {
    const isMongoID= ObjectId.isValid(termino);


    try {
        if(isMongoID){
            const producto= await Producto.findById(termino)
                .populate('usuario', ['nombre', 'correo', 'rol'])
                .populate('categoria', 'nombre');
    
            return res.status(200).json({
                results: producto ? [producto] : []
             })
        }
    
        const regex= new RegExp(termino, 'i');
        const [productos, count]= await Promise.all([
            Producto.find({
                $or: [{ nombre: regex }],
                $and: [{ nombre: regex }]
            })
            .populate('usuario', ['nombre', 'correo', 'rol'])
            .populate('categoria', 'nombre'),
            Producto.count({
                $or: [{ nombre: regex }],
                $and: [{ nombre: regex}]
            })
        ]);
    
    
        res.status(200).json({
            results: productos,
            count
        });
        
    } catch (error) {
        console.log(error);
    }
}

const buscar= (req= request, res= response)=> {
    const { coleccion, termino }= req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res);
            break;
        
        case "categoria":
            buscarCategoria(termino, res);
            break;

        case "productos":
            buscarProducto(termino, res);
            break;
    
        default:
            res.status(500).json({
                'msg': "Se me olvido hacer esta busqueda"
            })
            break;
    }
}


module.exports= {
    buscar
}