const { Router }= require('express');
const { validarCampos }= require('../middlewares/validar-campos');

const { login, googleSignIn }= require('../controllers/auth');

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
router.post('/', (req, res)=> {
    res.json('POST');
});


//Actualizar categoria por id -privado-->Cualquiera con token valido
router.put('/:id', (req, res)=> {
    res.json('PUT');
});


//Borrar una categoria -Admin
router.delete('/:id', (req, res)=> {
    res.json('delete')
});


module.exports= router;