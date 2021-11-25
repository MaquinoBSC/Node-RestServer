const { Router }= require('express');
const { check }= require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto }= require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router= Router();

//Obtener todos los productos
router.get('/', obtenerProductos);

//Obtener un producto en especifico
router.get('/:id', [
    check('id', "EL id no es valido").isMongoId(),
    check('id').custom((id)=> existeProductoPorId(id)),
    validarCampos
], obtenerProducto);

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
