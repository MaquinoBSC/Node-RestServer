const Role= require('../models/role');
const { Producto, Categoria, Usuario } = require('../models');


const esRoleValido= async(rol= '') => {
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}


const yaExisteEmail= async(correo)=> {
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya existe`);
    }
}

const existeUsuarioPorId= async(id)=> {
    const existeUsuario= await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe usuario con id: ${id}`);
    }
}

const existeCategoriaPorId= async (id)=> {
    const existeCategoria= await Categoria.findById({ "_id": id });

    if(!existeCategoria){
        throw new Error(`No existe categoria con id: ${ id }`);
    }
}


const existeProductoPorId= async (id)=> {
    const existeProducto= await Producto.findById({ "_id": id });

    if(!existeProducto){
        throw new Error(`No existe el producto con id: ${ id }`);
    }
}


const existeProductoPorNombre= async(nombre)=> {
    const existeProducto= await Producto.findOne({ nombre });

    if(existeProducto){
        throw new Error('EL producto ya existe');
    }
}


const coleccionesPermitidas= async(coleccion, colecciones= [])=> {
    const incluida= colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}



module.exports= {
    esRoleValido,
    yaExisteEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeProductoPorNombre,
    coleccionesPermitidas,
};