const { request, response } = require("express");
const { Categoria, Producto } = require("../models");


const obtenerProductos= async (req= request, res= response)=> {
    const { limit= 5, desde= 0 }= req.query;
    const query= { estado: true };

    const [count, productos]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(desde)
            .limit(limit)
            .populate('usuario', ['nombre', 'correo', 'rol'])
            .populate('categoria', ['nombre'])
    ]);

    res.status(200).json({
        count,
        productos
    });
}


const obtenerProducto= async (req= request, res= response)=> {
    const { id }= req.params;

    try {
        const producto= await Producto.findById({ "_id": id })
            .populate('usuario', ['nombre', 'correo', 'rol'])
            .populate('categoria', ['nombre']);

            res.status(200).json(producto);

    } catch (error) {
        console.log(error);
    }
}


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

const actualizarProducto= async (req= request, res= response)=> {
    const { id }= req.params;
    const { nombre, precio, categoria, descripcion, disponible }= req.body;
    const categoriaDB= await Categoria.findById(categoria);

    data= {
        nombre,
        precio,
        categoria: categoriaDB._id,
        descripcion,
        disponible,
        usuario: req.user._id,
    };

    const producto= await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate( 'usuario', ['nombre', 'rol', 'correo'])
        .populate('categoria', 'nombre');

    res.status(200).json( producto );
}


const borrarProducto= async (req= request, res= response)=> {
    const { id }= req.params;

    const producto= await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
        .populate('usuario', ['nombre', 'rol', 'corroe'])
        .populate('categoria', 'nombre');


    res.status(200).json( producto );
}



module.exports= {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
}