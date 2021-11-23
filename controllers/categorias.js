const { request, response } = require("express");
const { Categoria }= require('../models');


// obtenerCategorias -paginado -total -populate
const obtenerCategorias= async(req= request, res= response)=> {
    const { limit= 5, desde= 0 }= req.query;
    const query= { estado: true };
    
    const [total, categorias]= await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find()
            .skip( Number(desde) )
            .limit( Number(limit) )
            .populate('usuario')
    ])
        
    res.status(200).json({
        total,
        categorias
    });
}


// obtenerCategoria -populate {}
const obtenerCategoria= async(req= request, res= response)=> {
    const { id }= req.params;

    const categoria= await Categoria.findById({ _id: id }).populate('usuario');

    res.status(200).json( categoria );
}


const crearCategoria= async (req=request, res= response)=> {
    const nombre= req.body.nombre.toUpperCase();

    const categoridb= await Categoria.findOne({ nombre });
    if(categoridb){
        res.status(400).json({
            msg: `La categoria ${categoridb.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data= {
        nombre,
        usuario: req.user._id
    };

    const categoria= new Categoria(data);
    await categoria.save();

    res.status(200).json( categoria );
}


// actualizarCategoria 
const actualizarCategoria= async (req= request, res= response)=> {
    const { id }= req.params;
    const { nombre }= req.body;

    const data= {};

    if(nombre){
        data.nombre= nombre.toUpperCase();
        data.usuario= req.user._id;
    }
    else{
        res.status(200).json({
            msg: "No hay datos para actualizar"
        });
    }

    const categoria= await Categoria.findByIdAndUpdate(id, data);

    res.status(200).json(categoria);
}


// borrarCategoria -estado:false
const borrarCategoria= async (req= request, res= response)=> {
    const { id }= req.params;

    const categoria= await Categoria.findByIdAndUpdate(id, { estado: false });
    
    res.status(200).json( categoria );
}


module.exports= {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}