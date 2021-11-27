const { Router }= require('express');
const { check }= require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto }= require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

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


router.put('/:id', [
    validarJWT,
    check('id', "El id no es valido").isMongoId(),
    check('id').custom((id)=> existeProductoPorId(id)),
    check('nombre', "El nombre del producto es necesario").not().isEmpty(),
    check('precio', "El precio del producto es necesario").not().isEmpty(),
    check('precio', "El precio del producto debe ser un valor numerico").isNumeric(),
    check('categoria', "La categoria del producto es necesaria").not().isEmpty(),
    check('categoria', "El id de la categoria no es valido").isMongoId(),
    check('categoria').custom((categoria)=> existeCategoriaPorId(categoria)),
    check('descripcion', "La descripcion del producto es necesaria").not().isEmpty(),
    check('disponible', "La disponibilidad del producto es necsaria").not().isEmpty(),
    check('disponible', "El valor de disponibilidad debe de ser true o false").isBoolean(),
    validarCampos
], actualizarProducto );


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "El id no es valido").isMongoId(),
    check('id').custom((id)=> existeProductoPorId(id)),
    validarCampos
], borrarProducto);


module.exports= router;
