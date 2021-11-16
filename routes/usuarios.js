const { Router } = require('express');
const { check } = require('express-validator');

const { 
    usuariosGet, 
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
    
const { esRoleValido, yaExisteEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos }= require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router= Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', "No es un id valido").isMongoId(),
    check('id').custom((id)=> existeUsuarioPorId(id)),
    check('rol').custom((rol)=> esRoleValido(rol)),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password debe de ser mas de 6 letras").isLength({min: 6}),
    check('correo', "El correo no es válido").isEmail(),
    check('correo').custom((correo)=> yaExisteEmail(correo)),
    check('rol').custom((rol)=> esRoleValido(rol)),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "No es un id valido").isMongoId(),
    check('id').custom((id)=> existeUsuarioPorId(id)),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports= router;