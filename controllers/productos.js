const { request, response } = require("express");
const { Categoria, Producto } = require("../models");


const crearProducto= async (req= request, res= response)=> {
    const { nombre, precio, categoria, descripcion }= req.body;
    
    const categoriaDB= await Categoria.findById({ "_id": categoria });
    
    let data= {
        nombre,
        usuario: req.user._id,
        categoria: categoriaDB._id,
        descripcion
    };

    if(precio){
        if(isNaN(precio)){
            return res.status(400).json({
                msg: "El precio debe ser un numero"
            })
        }

        data.precio= precio;
    }

    const producto= new Producto(data);
    await producto.save();

    res.json( producto );
}


module.exports= {
    crearProducto
}