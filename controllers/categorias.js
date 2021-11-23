const { request, response } = require("express");
const { Categoria }= require('../models');

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


module.exports= {
    crearCategoria,
}