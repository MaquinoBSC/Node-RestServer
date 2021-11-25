const { Router }= require('express');
const { check }= require('express-validator');
const { crearProducto }= require('../controllers/productos');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router= Router();


router.post('/', [
    validarJWT,
    check('nombre', "El nombre es requerido").not().isEmpty(),
    check('categoria', "La categoria es requerida").not().isEmpty(),
    check('categoria', "La categoria no es valida").isMongoId(),
    check('categoria').custom((categoria)=> existeCategoriaPorId(categoria)),
    check('descripcion', "La descripción es requerida").not().isEmpty(),
    validarCampos
], crearProducto);


module.exports= router;
