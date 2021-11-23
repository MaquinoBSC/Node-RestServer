const Role= require('../models/role');
const Usuario= require('../models/usuario');
const Categoria= require('../models/categoria');


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



module.exports= {
    esRoleValido,
    yaExisteEmail,
    existeUsuarioPorId,
    existeCategoriaPorId
};