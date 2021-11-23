const { Router }= require('express');
const { check } = require('express-validator');

const { validarCampos }= require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');

const router= Router();


//Obtener todas las categorias -public
router.get('/', (req, res)=> {
    res.json('OK')
});


//Obtener una categoria por id -public
router.get('/:id', (req, res)=> {
    res.json('OK')
});


//Crear una nueva categoria -privado--> cualquier rol con un token valido
router.post('/', [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria );


//Actualizar categoria por id -privado-->Cualquiera con token valido
router.put('/:id', (req, res)=> {
    res.json('PUT');
});


//Borrar una categoria -Admin
router.delete('/:id', (req, res)=> {
    res.json('delete')
});


module.exports= router;