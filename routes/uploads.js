const { Router }= require('express');
const { check }= require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir }= require('../middlewares');

const router= Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', "EL id no es valido").isMongoId(),
    check('coleccion').custom((coleccion)=> coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen)


module.exports= router;