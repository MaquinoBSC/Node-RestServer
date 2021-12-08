const { Router }= require('express');
const { check }= require('express-validator');
const { cargarArchivo, actualizarImagen, servirArchivo } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir }= require('../middlewares');

const router= Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', "EL id no es valido").isMongoId(),
    check('coleccion').custom((coleccion)=> coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarArchivoSubir,
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', "El id no es valido").isMongoId(),
    check('coleccion').custom((coleccion)=> coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarCampos
], servirArchivo)


module.exports= router;